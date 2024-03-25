import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
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
    const wallet = useAnchorWallet();
    console.log("wallet",wallet)
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

    async function createCounter() {
        const provider = getProvider();

        if (!provider) {
            return;
        }

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, config.programId, provider);
        try {
            const data = await program.account.global.fetch(config.accountGlobalId);

            console.log('account: ', data);
            console.log('claimableTokens: ', data.claimableTokens.toString());
            console.log('claimedTokens: ', data.claimedTokens.toString());
            console.log('totalUsers: ', data.totalUsers.toString());
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
                    claim site as a convenient way for to gift you some $SBF tokens. We CAN make it all back."
                </div>
                <div className="eligibility-cta" onClick={createCounter}>
                    Check Eligibility
                </div>
            </div>
        </div>
    );
};
