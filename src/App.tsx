import React, { FC, ReactNode, useMemo } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import ClaimPage from './pages/ClaimPage';
import Home from './Component/Home';
import Multisender from './Component/Multisender';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {
    const navigate = useNavigate()
    return (
        <div className="App">
            <div className="header">
                <img src="./img/Logo.png" alt="navbarImage" className="header-logo" />
                <div className="nav-flex">
                    <p className="nav-link" onClick={()=>navigate("/")}>Claim</p>
                    <p className="nav-link" onClick={()=>navigate("/admin")}>Airdrop Admin</p>
                    <Home />
                </div>
            </div>
            <Routes>
                <Route path="*" element={<ClaimPage />} />
                <Route path="admin" element={<Multisender />} />
            </Routes>
        </div>
    );
};

export default App;
