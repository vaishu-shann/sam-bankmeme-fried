import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';

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

    const wallets = useMemo(() => [], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
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
                <div className="eligibility-cta">Check Eligibility</div>
            </div>
        </div>
    );
};
