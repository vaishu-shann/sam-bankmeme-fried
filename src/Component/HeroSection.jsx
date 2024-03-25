import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import base58 from 'bs58';

const HeroSection = () => {
    const { publicKey } = useWallet();
    // const walletAddress = publicKey.toBase58();
    // console.log("walletAddress",walletAddress)
    return (
        <div className="hero-section">
            <div className="avatar">
                <img src="./img/Hero-Img.png" alt="hero-image" className="floating" />
            </div>
            <div className="hero-desc">
                "Hi, Sam here. I know I’ve made some monumental mistakes with FTX. So, I’ve set up a token airdrop claim
                site as a convenient way for to gift you some $SBF tokens. We CAN make it all back."
            </div>
            <div className="eligibility-cta">Check Eligibility</div>
        </div>
    );
};

export default HeroSection;
