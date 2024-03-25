import React from 'react'
import Multisender from '../Component/Multisender'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
const AdminPage = () => {
  return (
    <div>
              <div className="header">
                <img src="./img/Logo.png" alt="navbarImage" className="header-logo" />
                <div className="nav-flex">                    
                <WalletMultiButton />
                </div>
            </div>
      <Multisender/>
    </div>
  )
}

export default AdminPage
