import React from 'react';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="avatar">
                <img src="./img/Hero-Img.png" alt="her-image" className="floating" />
            </div>
            <div className="hero-desc">
                Welcome to my little cell, fellow crypto enthusiasts! Sure, I may have lost the billions, but hey, who
                needs money when you can buy a meme-coin based off of a nerd who swindled you, ouch.
            </div>
            <div className='eligibility-cta'>Check Eligibility</div>
        </div>
    );
};

export default HeroSection;
