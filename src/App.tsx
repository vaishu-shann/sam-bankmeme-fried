import { Route, Routes, useNavigate } from 'react-router-dom';
import ClaimPage from './pages/ClaimPage';
import Home from './Component/Home';
import Multisender from './Component/Multisender';
import "./utils/social.css"

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {
    return (
        <div className="App">
            <div className="header">
                <img src="./img/Logo.png" alt="navbarImage" className="header-logo" />
                <div className="nav-flex">
                    
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
