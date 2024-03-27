import Multisender from '../Component/Multisender';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import idl from '../services/idl.json';
import config from '../config';

import * as buffer from 'buffer';
(window as any).Buffer = buffer.Buffer;

const AdminPage = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};

export default AdminPage;

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


    async function updateUsers() {
        const program = getProgram();
        if (!program || !wallet) {
            return;
        }
        try {
            let result = await program.methods
                .updateUsers()
                .accounts({
                    userList: new web3.PublicKey(config.UserListID),
                    global: new web3.PublicKey(config.GlobalAccountID),
                    owner: wallet.publicKey,
                })
                .rpc();
            // if (result) {
            //     setSuccessfulClaim('done');
            // }
            // setSignature(result.toString());
            console.log('claim result: ', result);
            console.log('claim result: ', result.toString());
        } catch (err) {
            console.log('Transcation error: ', err);
            // setSuccessfulClaim('fail');
        }
    }

    return (
        <div>
            <div>
                <div className="header">
                    <img src="./img/logo-sbf.png" alt="navbarImage" className="header-logo" />
                    <div className="nav-flex">
                        <WalletMultiButton />
                    </div>
                </div>
                <Multisender />
            </div>
        </div>
    );
};
