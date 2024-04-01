import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState, useEffect } from 'react';
import idl from '../services/idl.json';
import config from '../config';
import { BiWallet, BiError } from 'react-icons/bi';
import { BsFiletypeCsv } from 'react-icons/bs';
import { TbLockAccess } from 'react-icons/tb';
import { IconContext } from 'react-icons';
import { Modal } from 'antd';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { FaCopy } from 'react-icons/fa6';
import copy from 'copy-to-clipboard';
import { PublicKey } from '@solana/web3.js';
import * as buffer from 'buffer';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const code = ``;
const codeExample = `A5xb3WyAZRbwM8NfcXocdv5JUHZREDsF2acBKC54t82S,4.0056
Agpew1jK6nD14N6SbM8FvMYhQs9Jv7w6s24r7KkhDDr3,8.45
7tDsvpnu7afxXXLzCfUhFag1wfQbMC91z5acAZFqtZhm,10.049`;

const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
        .split('\n')
        .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
        .join('\n');

window.Buffer = buffer.Buffer;

const AdminPage = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};

export default AdminPage;

const Context = ({ children }) => {
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
const Content = () => {
    const wallet = useAnchorWallet();
    const walletAddress = useAnchorWallet();
    const [codeValue, setCodeValue] = useState(code);
    const [codeValueExample, setCodeValueExample] = useState(codeExample);
    const [copyCode, setCopyCode] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [loadingText, setLoadingText] = useState();
    const [totalSenders, setTotalSenders] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [toAddressArray, setToAddressArray] = useState([]);
    const [amountArray, setAmountArray] = useState([]);
    const [successfulSend, setSuccessfulSend] = useState();
    const [endCTA, setEndCTA] = useState(null);
    const [revokeCTA, setRevokeCTA] = useState(null);
    const [endModalError, setEndModalError] = useState(false)
    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(config.ATokenProgram);

    const copyToClipboard = () => {
        setCopyCode(true);
        copy(codeExample);
        setTimeout(() => {
            setCopyCode(false);
        }, 2000);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            const file = e.target.result;
            console.log(file);
            setCodeValue(file);
        };
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToTop();
    }, []);

    const onMultiSend = async () => {
        try {
            console.log('code value', codeValue);
            let total_amount = 0;
            let amount_array = [];
            let toAddress_array = [];
            let total_senders = 0;
            let senders = codeValue.split('\n');
            for (let index = 0; index < senders.length; index++) {
                const sender = senders[index];
                let value = sender.split(',');

                toAddress_array.push(new PublicKey(value[0]));
                console.log('toAddress_array', toAddress_array);

                amount_array.push(new BN(value[1] * Math.pow(10, config.TokenDecimals)));
                console.log('amount_array', amount_array);

                if (value[1] > 0) {
                    total_amount += Number(value[1]);
                    setTotalAmount(total_amount);
                    total_senders++;
                    setTotalSenders(total_senders);
                }
            }
            setToAddressArray(toAddress_array);
            setAmountArray(amount_array);
            await updateUser(toAddress_array, amount_array);
        } catch (err) {
            console.log('error in onMultiSend', err);
        }
    };

    const onDeployClick = async () => {
        try {
            setLoadingText('loading');
        } catch (error) {
            console.log(error);
            setLoadingText('error');
            return;
        }
    };
    const closeModal1 = () => {
        setModal1Open(false);
    };
    const closeModal2 = () => {
        setModal2Open(false);
    };
    const closeModal3 = () => {
        setModal3Open(false);
    };

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

    async function updateUser(toAddress_array, amount_array) {
        const program = getProgram();
        if (!program || !wallet) {
            return;
        }
        try {
            console.log('toAddressArray: ', toAddress_array.toString());
            console.log('amountArray: ', amount_array.toString());

            let result = await program.methods
                .updateUsers(toAddress_array, amount_array)
                .accounts({
                    userList: new web3.PublicKey(config.UserListID),
                    global: new web3.PublicKey(config.GlobalAccountID),
                    owner: wallet.publicKey,
                })
                .rpc();

            if (result) {
                setSuccessfulSend('done');
            }
            // setSignature(result.toString());
            console.log('claim result: ', result);
            console.log('claim result: ', result.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
            setSuccessfulSend('fail');
        }
    }

    const onRevokeTokens = async () => {
        const program = getProgram();
        if (!program || !wallet) {
            return;
        }
        // -------- CHECK USER WALLET BUMP
        const userAccount = await PublicKey.findProgramAddress(
            [Buffer.from('global')],
            new PublicKey(config.ProgramID)
        );
        let bump = userAccount[1];
        console.log('User Bump: ', userAccount.toString());

        let owner_ata = PublicKey.findProgramAddressSync(
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
        console.log('User ATA: ', owner_ata.toString());

        try {
            console.log('revokeCTA: ', revokeCTA);
            let tokenValue = revokeCTA * Math.pow(10, config.TokenDecimals);
            console.log('tokenValue: ', tokenValue);

            let result = await program.methods
                .claimRemainingTokens(new BN(bump), new BN(tokenValue))
                .accounts({
                    userList: new web3.PublicKey(config.UserListID),
                    global: new web3.PublicKey(config.GlobalAccountID),
                    globalAta: new web3.PublicKey(config.GlobalATA),
                    ownerAta: owner_ata,
                    mint: new web3.PublicKey(config.TokenMintID),
                    owner: wallet.publicKey,
                    systemProgram: new web3.PublicKey(config.SystemProgram),
                    tokenProgram: new web3.PublicKey(config.TokenProgram),
                    associatedTokenProgram: new web3.PublicKey(config.ATokenProgram),
                })
                .rpc();
            if (result) {
                setSuccessfulSend('done');
            }
            // setSignature(result.toString());
            console.log('claim RESET result: ', result);
            console.log('claim RESET result: ', result.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
            setSuccessfulSend('fail');
        }
    };

    const onEndClaim = async () => {
        if (endCTA != 'Admin' || endCTA != 'admin') {
            setEndModalError(true)
            return;
        }

        const program = getProgram();
        if (!program || !wallet) {
            return;
        }
        try {
            let result = await program.methods
                .resetUsers()
                .accounts({
                    userList: new web3.PublicKey(config.UserListID),
                    global: new web3.PublicKey(config.GlobalAccountID),
                    owner: wallet.publicKey,
                })
                .rpc();
            if (result) {
                setSuccessfulSend('done');
            }
            // setSignature(result.toString());
            console.log('claim RESET result: ', result);
            console.log('claim RESET result: ', result.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
            setSuccessfulSend('fail');
        }
    };

    return (
        <div>
            <div>
                <div className="header">
                    <img src="./img/logo-sbf.png" alt="navbarImage" className="header-logo" />
                    <div className="nav-flex">
                        <div className="csv-button" onClick={() => setModal1Open(true)}>
                            End Claim{' '}
                        </div>
                        <div className="csv-button" onClick={() => setModal3Open(true)}>
                            Revoke Tokens
                        </div>
                        <WalletMultiButton />
                    </div>
                </div>
                <div className="ms-sec">
                    <div className="Heading">$SBF Token - Multisender</div>
                    <div className="tkn-addr">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.2em',
                                        color: 'rgb(139 149 169)',
                                        className: 'global-class-name',
                                    }}
                                >
                                    <div style={{ marginRight: 8 }}>
                                        <TbLockAccess />
                                    </div>
                                </IconContext.Provider>
                                <div className="sub-head">Token Address</div>
                            </div>
                            {/* <div className="sub-head">Balance: --</div> */}
                        </div>
                        <input
                            placeholder="Please enter the token address"
                            className="token-input-ms"
                            value={'FkbWN4dcFQym2PgCELfThghQqLuA2e2jThMJyhZjfG4M'}
                        />
                    </div>
                    <div className="tkn-addr">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    marginTop: 25,
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.2em',
                                        color: 'rgb(139 149 169)',
                                        className: 'global-class-name',
                                    }}
                                >
                                    <div style={{ marginRight: 8 }}>
                                        <BsFiletypeCsv />
                                    </div>
                                </IconContext.Provider>
                                <div className="sub-head">List of Addresses in CSV</div>
                            </div>
                            <div className="sub-head" style={{ cursor: 'pointer' }} onClick={() => setModal2Open(true)}>
                                Show example
                            </div>
                        </div>
                        <Editor
                            value={codeValue}
                            onValueChange={(code) => setCodeValue(code)}
                            highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                            padding={10}
                            textareaId="codeArea"
                            className="editor"
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 16,
                                outline: 0,
                                width: '99%',
                            }}
                        />
                        <div className="csv-button">
                            Upload CSV
                            <input type="file" name="input" onChange={handleChange} className="csv-opac" />
                        </div>
                    </div>
                    <button className="deploy-cta" onClick={onMultiSend}>
                        Continue
                    </button>

                    {successfulSend == 'done' ? (
                        <>
                            <div
                                className="hero-desc"
                                style={{ margin: '20px auto 0', color: 'rgb(209, 114, 37)', width: '100%' }}
                            >
                                Succesfully whitelisted {totalSenders} Users for {totalAmount} Tokens.
                            </div>
                        </>
                    ) : successfulSend == 'fail' ? (
                        <>
                            <div
                                className="hero-desc"
                                style={{ margin: '20px auto 0', color: '#e75c5c', width: '100%' }}
                            >
                                ❌ Transaction Reverted : Error in Smart Contract call.❌
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    <Modal
                        className="popup-modal"
                        title={''}
                        centered
                        open={modal2Open}
                        onOk={() => setModal2Open(false)}
                        onCancel={closeModal2}
                        okButtonProps={{ style: { display: 'none' } }}
                        cancelButtonProps={{ style: { display: 'none' } }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconContext.Provider
                                value={{
                                    size: '1.2em',
                                    color: 'rgb(0,0,0,0.7)',
                                    className: 'global-class-name',
                                }}
                            >
                                <div style={{ marginRight: 8, cursor: 'pointer' }} onClick={() => copyToClipboard()}>
                                    <FaCopy />
                                </div>
                            </IconContext.Provider>
                            <div
                                className="sub-head"
                                style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Azeret Mono' }}
                            >
                                {' '}
                                {copyCode ? 'Copied' : 'Example'}
                            </div>
                        </div>
                        <div style={{ marginTop: 20 }} />
                        <Editor
                            value={codeValueExample}
                            onValueChange={(code) => setCodeValueExample(code)}
                            highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                            padding={10}
                            textareaId="codeArea"
                            className="editor"
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 14,
                                outline: 0,
                                width: '99%',
                            }}
                        />
                        <div style={{ marginTop: 20 }} />
                    </Modal>

                    <Modal
                        className="End Claim"
                        title={''}
                        centered
                        open={modal1Open}
                        onOk={() => setModal1Open(false)}
                        onCancel={closeModal1}
                        okButtonProps={{ style: { display: 'none' } }}
                        cancelButtonProps={{ style: { display: 'none' } }}
                    >
                        <div className="sub-head" style={{ fontSize: 16, fontWeight: 500, fontFamily: 'Azeret Mono' }}>
                            End Claim
                        </div>

                        <div
                            className="sub-head"
                            style={{ marginTop: 45, marginBottom: 10, color: '#000', letterSpacing: 0.3 }}
                        >
                            Once you end the claim, there is no going back. Please be certain.
                        </div>
                        <input
                            className="mdl-ipt-txt"
                            onClick={(e) => setEndCTA(e.target.value)}
                            placeholder="Enter password here."
                        />

                        {endCTA == null ? (
                            <button className="gray-mdl-button">End Claim</button>
                        ) : (
                            <button className="mdl-button" onClick={onEndClaim}>
                                End Claim
                            </button>
                        )}

                        {endModalError && <div className="hero-desc" style={{ margin: '20px auto 0', color: '#000', width: '100%' }}>
                            ❌ You have entered the wrong password.❌
                        </div>}
                    </Modal>
                    <Modal
                        className="End Claim"
                        title={''}
                        centered
                        open={modal3Open}
                        onOk={() => setModal3Open(false)}
                        onCancel={closeModal3}
                        okButtonProps={{ style: { display: 'none' } }}
                        cancelButtonProps={{ style: { display: 'none' } }}
                    >
                        <div className="sub-head" style={{ fontSize: 16, fontWeight: 500, fontFamily: 'Azeret Mono' }}>
                            Revoke Tokens
                        </div>

                        <div
                            className="sub-head"
                            style={{ marginTop: 45, marginBottom: 10, color: '#000', letterSpacing: 0.3 }}
                        >
                            Once you revoke the tokens, there is no going back. Please be certain.
                        </div>
                        <input className="mdl-ipt-txt" onClick={(e) => setRevokeCTA(e.target.value)} placeholder='Enter the no.of tokens to revoke' />

                      {revokeCTA == null ? 
                            <button className="gray-mdl-button">Revoke Tokens</button>
                      
                      :
                      <button className="mdl-button" onClick={onRevokeTokens}>
                            Revoke Tokens
                        </button>}
                    </Modal>
                </div>
            </div>
        </div>
    );
};
