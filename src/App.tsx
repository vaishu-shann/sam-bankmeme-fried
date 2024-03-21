import React, { FC, ReactNode, useMemo } from 'react';
import Home from './Component/Home';
import HeroSection from './Component/HeroSection';
import MarqueeSection from './Component/Marquee';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App =( ) => {
return(
    <div className="App">
    <div className='header'>
    <img src='./img/Logo.png' alt='navbarImage' className='header-logo' />
    <Home/>
    </div>
    <HeroSection/>
    <MarqueeSection/>
    </div>
)
}

export default App;