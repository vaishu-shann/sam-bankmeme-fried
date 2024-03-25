import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import idl from '../services/idl.json';
import config from '../config';

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
    const wallet = useAnchorWallet();
    console.log('wallet', wallet);
    const baseAccount = web3.Keypair.generate();

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
        const program = new Program(prog_idl, config.programId, provider);
        return program;
    }

    async function getGlobalStats() {
        const program = getProgram();
        if (!program) {
            return;
        }

        try {
            const data:any = await program.account.global.fetch(config.accountGlobalId);

            console.log('account: ', data);
            console.log('claimableTokens: ', data.claimableTokens.toString());
            console.log('claimedTokens: ', data.claimedTokens.toString());
            console.log('totalUsers: ', data.totalUsers.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
        }
    }
    async function checkEligibility() {
        const program = getProgram();
        if (!program) {
            return;
        }
        try {
            const data = await program.account.user.fetch(config.accoundUserId);
            let is_eligible = false;
            let index;
            // await program.rpc.initialize({
            //     accounts: {
            //         myAccount: baseAccount.publicKey,
            //         user: provider.wallet.publicKey,
            //         systemProgram: web3.SystemProgram.programId,
            //     },
            //     signers: [baseAccount]
            // });

            // const account = await program.account.myAccount.fetch(baseAccount.publicKey);
            if (data.user.includes(wallet?.publicKey)) {
                console.log("Valid Claimer:", wallet?.publicKey.toString());
                is_eligible = true;
                index = data.user.indexOf(wallet?.publicKey)
            } else {
                console.log("InValid Claimer: ", wallet?.publicKey.toString());
            }

            console.log('account: ', data);
            console.log('user: ', data.user[0].toString());
            console.log('token: ', data.token[0].toString());
            // console.log('totalUsers: ', data.totalUsers.toString());

            // await program.rpc.increment({
            //     accounts: {
            //         myAccount: baseAccount.publicKey,
            //     },
            // });

            // const account = await program.account.myAccount.fetch(baseAccount.publicKey);
            // console.log('account: ', account.data.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
        }
    }

    async function claimTokens() {
        const program = getProgram();
        if (!program) {
            return;
        }
        try {
            await program.methods.claimToken(new BN(100), {
                accounts: {
                    myAccount: baseAccount.publicKey,
                },
            });

            const account = await program.account.myAccount.fetch(baseAccount.publicKey);
            // console.log('account: ', account.data.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
        }
    }

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
                    "Hi, Sam here. I know I’ve made some monumental mistakes with FTX. So, I’ve set up a token airdrop
                    claim site as a convenient way to gift you some $SBF tokens. We CAN make it all back."
                </div>
                {!isEligibleClaim ? (
                    <div className="eligibility-cta" onClick={checkEligibility}>
                        Check Eligibility
                    </div>
                ) : (
                    <div className="eligibility-cta" onClick={claimTokens}>
                        Claim your 500 $SBF Tokens
                    </div>
                )}
            </div>
        </div>
    );
};
