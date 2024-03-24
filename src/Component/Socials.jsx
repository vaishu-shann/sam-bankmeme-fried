import React from 'react';

const Socials = () => {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };
    return (
        <div className="social-section">
            <div className="card"  onClick={() => openInNewTab("https://jup.ag/swap/SOL-SBF_FkbWN4dcFQym2PgCELfThghQqLuA2e2jThMJyhZjfG4M")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/Jupiter.jpg" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            {/* <small class="badge">V2 Bot</small> */}
                            <img src="./img/Jupiter.jpg" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>Buy SBF on Jupiter</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">Buy SBF on Jupiter </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card" onClick={() => openInNewTab("https://birdeye.so/token/FkbWN4dcFQym2PgCELfThghQqLuA2e2jThMJyhZjfG4M?chain=solana")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/birdeye.jpg" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            <img src="./img/birdeye.jpg" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>Birdeye</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">View Chart </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card" onClick={() => openInNewTab("https://twitter.com/sambankmeme")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/x.png" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            <img src="./img/x.png" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>@sambankmeme</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">Follow us on X</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card"  onClick={() => openInNewTab("https://t.me/sambankmemecoin")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/tele.png" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            <img src="./img/tele.png" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>@sambankmeme</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">Join our Telegram</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card"  onClick={() => openInNewTab("")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/coingeko.png" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            <img src="./img/coingeko.png" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>@sambankmeme</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">Join our Telegram</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card"  onClick={() => openInNewTab("")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/cmc.png" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            <img src="./img/cmc.png" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>@sambankmeme</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">Join our Telegram</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card"  onClick={() => openInNewTab("")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/dex.png" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            <img src="./img/dex.png" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>@sambankmeme</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">Join our Telegram</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card"  onClick={() => openInNewTab("")}>
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="./img/polonix.avif" alt="" className="card-img" />
                        </div>
                    </div>

                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>

                            <div class="circle" id="right"></div>

                            <div class="circle" id="bottom"></div>
                        </div>

                        <div class="front-content">
                            <img src="./img/polonix.avif" alt="" className="front-card-img" />

                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>@sambankmeme</strong>
                                    </p>

                                    <svg
                                        fill-rule="nonzero"
                                        height="15px"
                                        width="15px"
                                        viewBox="0,0,256,256"
                                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            // style="mix-blend-mode: normal"
                                            text-anchor="none"
                                            font-size="none"
                                            font-weight="none"
                                            font-family="none"
                                            stroke-dashoffset="0"
                                            stroke-dasharray=""
                                            stroke-miterlimit="10"
                                            stroke-linejoin="miter"
                                            stroke-linecap="butt"
                                            stroke-width="1"
                                            stroke="none"
                                            fill-rule="nonzero"
                                            fill="#20c997"
                                        >
                                            <g transform="scale(8,8)">
                                                <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <p class="card-footer">Join our Telegram</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Socials;
