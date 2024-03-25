import Multisender from '../Component/Multisender';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';

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
