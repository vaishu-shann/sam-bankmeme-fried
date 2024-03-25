import { Route, Routes, useNavigate } from 'react-router-dom';
import ClaimPage from './pages/ClaimPage';
import "./utils/social.css"
import "./utils/faq.css"
import AdminPage from './pages/AdminPage';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {
    return (
        <div className="App">
        
            <Routes>
                <Route path="*" element={<ClaimPage />} />
                <Route path="admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
};

export default App;
