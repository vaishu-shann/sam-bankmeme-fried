import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import idl from '../services/idl.json';
import config from '../config';

// test
import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as buffer from 'buffer';
import { Buffer } from 'buffer/';
let claimTokenInDecimal: any;

(window as any).Buffer = buffer.Buffer;

const Home: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default Home;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const [isEligibleClaim, setIsEligibleClaim] = useState(false);
    const [showEligibleCTA, setShowEligibleCTA] = useState(true);
    const [notEligible, setNotEligible] = useState(false);
    const [userIndex, setUserIndex] = useState<any>();
    const [successfulClaim, setSuccessfulClaim] = useState<any>(null);
    const [signature, setSignature] = useState<any>();
    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(config.ATokenProgram);

    const wallet = useAnchorWallet();

    function getProvider() {
        if (!wallet) {
            return null;
        }

        const connection = new Connection(web3.clusterApiUrl('devnet'), 'confirmed');
        const provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: 'confirmed',
        });

        return provider;
    }

    function getProgram() {
        const provider = getProvider();
        if (!provider) {
            return;
        }

        const prog_idl = JSON.parse(JSON.stringify(idl));
        const program = new Program(prog_idl, config.ProgramID, provider);
        return program;
    }

    async function getGlobalStats() {
        const program = getProgram();
        if (!program) {
            return;
        }

        try {
            const data: any = await program.account.global.fetch(config.GlobalAccountID);

            console.log('account: ', data);
            console.log('claimableTokens: ', data.claimableTokens.toString());
            console.log('claimedTokens: ', data.claimedTokens.toString());
            console.log('totalUsers: ', data.totalUsers.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
        }
    }

    async function checkEligibility() {
        // let list_ata = PublicKey.findProgramAddressSync(
        //     [
        //         // user_list public key
        //         new PublicKey("ESd8AQLP9tREMMSJr4ps1DzpNB9W2eTeJQfy9nnoVTgD").toBuffer(),
        //         // splana token program id TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
        //         TOKEN_PROGRAM_ID.toBuffer(),
        //         // token mint address id
        //         new PublicKey("EbVXnyXFeZ1dYeHGBGMcdrKhmTrz48crFrj98U7rWrbe").toBuffer(),
        //     ],

        //     // solan associated token program
        //     SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        // )[0];
        // console.log("ATA: ", list_ata.toString())

        // let user_ata = PublicKey.findProgramAddressSync(
        //     [
        //         // user_list public key
        //         new PublicKey("7tDsvpnu7afxXXLzCfUhFag1wfQbMC91z5acAZFqtZhm").toBuffer(),
        //         // splana token program id TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
        //         TOKEN_PROGRAM_ID.toBuffer(),
        //         // token mint address id
        //         new PublicKey("EbVXnyXFeZ1dYeHGBGMcdrKhmTrz48crFrj98U7rWrbe").toBuffer(),
        //     ],

        //     // solan associated token program
        //     SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        // )[0];
        // console.log("User ATA: ", user_ata.toString())

        const vaultAccount = await PublicKey.findProgramAddress(
            [Buffer.from('list')],
            new PublicKey('DB8D2BUejs8UFu7PbxSf2r5ftHFfyW16gbuNZ6CgbRz6')
        );

        // console.log("User Bump: ", vaultAccount.toString())

        const program = getProgram();
        if (!program || !wallet) {
            return;
        }
        try {
            let data: any = await program.account.user.fetch(config.UserListID);
            console.log('users data: ', data);

            let users: Array<PublicKey> = data.user;
            let amounts: Array<BN> = data.token; //put user index
            console.log('user: ', users.toString());
            console.log('token: ', amounts.toString());
            let resp = users.find((ele) => ele.toString() === wallet.publicKey.toString());

            if (resp) {
                let user_index = users.indexOf(resp);
                setUserIndex(user_index);
                let claimAmount = amounts[user_index]; //10 power 9
                claimTokenInDecimal = Number(claimAmount) / Math.pow(10, config.TokenDecimals);
                console.log('claimTokenInDecimal', claimTokenInDecimal);
                console.log('claimAmountr:', claimAmount.toString());
                console.log('Valid Claimer:', wallet.publicKey.toString());
                setShowEligibleCTA(false);
                setIsEligibleClaim(true);
            } else {
                console.log('Invalid Claimer: ', wallet.publicKey.toString());
                setNotEligible(true);
            }
        } catch (err) {
            console.log('Transcation error: ', err);
        }
    }

    async function claimTokens() {
        const program = getProgram();
        if (!program || !wallet) {
            return;
        }
        try {
            const user_key = await PublicKey.findProgramAddress([Buffer.from('list')], new PublicKey(config.ProgramID));
            let bump = user_key[1];

            let user_ata = PublicKey.findProgramAddressSync(
                [
                    // user public key
                    wallet.publicKey.toBuffer(),
                    TOKEN_PROGRAM_ID.toBuffer(),
                    // token mint address id
                    new PublicKey(config.TokenMintID).toBuffer(),
                ],

                // solan associated token program
                SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
            )[0];
            console.log('User ATA: ', user_ata.toString());

            let result = await program.methods
                .claimToken(new BN(bump), new BN(userIndex))
                .accounts({
                    userList: new web3.PublicKey(config.UserListID),
                    global: new web3.PublicKey(config.GlobalAccountID),
                    user: wallet.publicKey,
                    mint: new web3.PublicKey(config.TokenMintID),
                    userAta: user_ata,
                    listAta: new web3.PublicKey(config.UserListATA),
                    systemProgram: new web3.PublicKey(config.SystemProgram),
                    tokenProgram: new web3.PublicKey(config.TokenProgram),
                    associatedTokenProgram: new web3.PublicKey(config.ATokenProgram),
                })
                .rpc();
            if (result) {
                setSuccessfulClaim('done');
            }
            setSignature(result.toString());
            console.log('claim result: ', result);
            console.log('claim result: ', result.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
            setSuccessfulClaim('fail');
        }
    }

    const moveToExplorer = (url: any) => {
        window.open(url, '_blank', 'noreferrer');
    };

    return (
        <div>
            <div className="header">
                <img src="./img/logo-sbf.png" alt="navbarImage" className="header-logo" />
                <div className="nav-flex">
                    <WalletMultiButton />
                </div>
            </div>

            <div className="hero-section">
                <div className="avatar">
                    <img src="./img/Hero-Img.png" alt="hero-image" className="floating" />
                </div>
                <div className="hero-desc">                    
                    Hi, Sam here. I know I’ve made some monumental mistakes with FTX. So, I’ve set up this claim site for ALL future
                    $SBF airdrops moving forward. Together, we CAN make it all back.
                </div>
                <div className="hero-section">
                    {showEligibleCTA ? (
                        <>
                            {notEligible ? (
                                <div className="not-eligibility-cta">❌ Not Elligible ❌</div>
                            ) : (
                                <div className="eligibility-cta" onClick={checkEligibility}>
                                    Check Eligibility
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {!isEligibleClaim ? (
                                <div className="eligibility-cta" onClick={claimTokens}>
                                    No Claim Available
                                </div>
                            ) : (
                                <>
                                    {successfulClaim != null ? (
                                        <></>
                                    ) : (
                                        <div className="eligibility-cta" onClick={claimTokens}>
                                            Claim your {claimTokenInDecimal} {config.TokenName} Tokens
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                {successfulClaim == 'done' ? (
                    <div>
                        <div
                            className="hero-desc"
                            style={{ margin: '20px auto 0', color: 'rgb(209, 114, 37)', width: '100%' }}
                        >
                            Succesfully claimed your Token
                        </div>
                        <div className="hero-desc" style={{ margin: '20px auto 0', width: '100%' }}>
                            {' '}
                            View on Explorer :{' '}
                            <span
                                style={{
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '5px',
                                    color: 'rgb(209, 114, 37)',
                                }}
                                onClick={() =>
                                    moveToExplorer(config.ExplorerLink + signature + '?cluster=' + config.netwrok)
                                }
                            >
                                {config.ExplorerLink + signature + '?cluster=' + config.netwrok}
                            </span>
                        </div>
                    </div>
                ) : successfulClaim == 'fail' ? (
                    <>
                        <div className="hero-desc" style={{ margin: '20px auto 0', color: '#e75c5c', width: '100%' }}>
                            ❌ Transaction Reverted : Error in Smart Contract call.❌
                        </div>
                    </>
                ) : (
                    <></>
                )}
                <div className="hero-desc" style={{ margin: '20px auto 0', fontSize: 15 }}>
                    Not eligible? <br />
                    Submit your Saga wallet address <a href="">here</a>.
                </div>
            </div>
        </div>
    );
};
