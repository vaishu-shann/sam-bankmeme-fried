import React, { useContext, useEffect, useState } from 'react';
import { SiHiveBlockchain } from 'react-icons/si';
import { BiWallet, BiError } from 'react-icons/bi';
import { BsFiletypeCsv } from 'react-icons/bs';
import { TbLockAccess } from 'react-icons/tb';
import { IconContext } from 'react-icons';
import { Modal } from 'antd';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { getEllipsisTxt } from '../utils/formatter';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

let TokenSymbol = '';

const code = `





`;

const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
        .split('\n')
        .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
        .join('\n');

function Multisender() {
    const walletAddress = useAnchorWallet();
    const [codeValue, setCodeValue] = useState(code);
    const [modal1Open, setModal1Open] = useState(false);
    const [loadingText, setLoadingText] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalSenders, setTotalSenders] = useState(0);
    const [tokenAddress, setTokenAddress] = useState();
    const handleChange = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            const file = e.target.result;
            console.log(file);
            setCodeValue(file);
        };

        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToTop();
    }, []);

    const onMultiSend = async () => {};

    const onDeployClick = async () => {
        try {
            setLoadingText('loading');
        } catch (error) {
            console.log(error);
            setLoadingText('error');
            return;
        }
    };
    const closeModal = () =>{
      setModal1Open(false)
      window.location.reload();
    }
    return (
        <div className="ms-sec">
            <div className="Heading">$SBF Token - Multisender</div>
            <div className="tkn-addr">
            <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <IconContext.Provider
                value={{
                  size: "1.2em",
                  color: "rgb(139 149 169)",
                  className: "global-class-name",
                }}
              >
                <div style={{ marginRight: 8 }}>
                  <TbLockAccess />
                </div>
              </IconContext.Provider>
              <div className="sub-head">Token Address</div>
            </div>
            <div className="sub-head">
              
                Balance: --
              </div>
            </div>
            <input
                placeholder="Please enter the token address"
                className="token-input-ms"
                value={"FkbWN4dcFQym2PgCELfThghQqLuA2e2jThMJyhZjfG4M"}
              />
            </div>
            <div className="tkn-addr">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 10,
                        marginTop: 25,
                    }}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.2em',
                            color: 'rgb(139 149 169)',
                            className: 'global-class-name',
                        }}
                    >
                        <div style={{ marginRight: 8 }}>
                            <BsFiletypeCsv />
                        </div>
                    </IconContext.Provider>
                    <div className="sub-head">List of Addresses in CSV</div>
                </div>
                <Editor
                    value={codeValue}
                    onValueChange={(code) => setCodeValue(code)}
                    highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                    padding={10}
                    textareaId="codeArea"
                    className="editor"
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 16,
                        outline: 0,
                        width: '99%',
                    }}
                />
                <div className="csv-button">
                    Upload CSV
                    <input type="file" name="input" onChange={handleChange} className="csv-opac" />
                </div>
            </div>
            {walletAddress ? (
                <button className="deploy-cta" onClick={onMultiSend}>
                    Continue
                </button>
            ) : (
                <button className="deploy-cta-gray">Continue</button>
            )}
            <Modal
                className="popup-modal"
                title={'MultiSender Detail'}
                centered
                open={modal1Open}
                onOk={() => setModal1Open(false)}
                onCancel={closeModal}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div style={{ marginTop: 20 }} />

                {loadingText == 'none' && (
                    <>
                        <div className="m-head" style={{ paddingBottom: 8 }}>
                            Total no.of Sender: {totalSenders}
                        </div>
                        <div className="m-head" style={{ paddingBottom: 8 }}>
                            Token Sending: {TokenSymbol}
                        </div>
                        <div className="m-head" style={{ paddingBottom: 8 }}>
                            Total no.of Token: {totalAmount}
                        </div>
                        <button className="deploy-cta" style={{ margin: '15px 0 8px' }} onClick={onDeployClick}>
                            Approve
                        </button>
                    </>
                )}
                {loadingText == 'success' && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                            <div className="m-head">Transaction Hash:</div>
                            <div className="m-desc">Transaction hash </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            <div className="m-head" style={{ paddingBottom: 5 }}>
                                View inExplorer:{' '}
                            </div>
                            link to explorer
                        </div>
                    </>
                )}
                {loadingText == 'error' && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <IconContext.Provider
                            value={{
                                size: '4em',
                                color: 'tomato',
                                className: 'global-class-name',
                            }}
                        >
                            <div style={{ marginBottom: 8, marginTop: 15 }}>
                                <BiError />
                            </div>
                        </IconContext.Provider>
                        <div className="m-head" style={{ paddingBottom: 15, color: '#fff', textAlign: 'center' }}>
                            Error while sending the token. Please check the values entered and Try again !
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Multisender;
