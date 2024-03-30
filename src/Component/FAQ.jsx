import React from 'react';

const FAQ = () => {
    return (
        <>
            <div class="card-wrapper  | content-cc">
                <div class="faq-card">
                    <div class="faq-ilustrations">
                        <img class="mobile pattern" src="./img/Logo.png" />
                    </div>

                    <main class="faq-content">
                        <h1>FAQ</h1>

                        <div class="faq-articles">
                            <article class="faq-accordion">
                                <input type="checkbox" class="tgg-title" id="tgg-title-1" />

                                <div class="faq-accordion-title">
                                    <label for="tgg-title-1">
                                        <h2>
                                            Why did you create a token airdrop claim site instead of airdropping all of
                                            the tokens via a multi-sender?{' '}
                                        </h2>
                                        <span class="arrow-icon">
                                            <img src="https://raw.githubusercontent.com/Romerof/FAQ-accordion-card/main/images/icon-arrow-down.svg" />
                                        </span>
                                    </label>
                                </div>

                                <div class="faq-accordion-content">
                                    <p>
                                        First, the recent spike in activity levels on Solana has led to limitations with
                                        Solana RPC, making it nearly impossible for us to distribute tokens directly to
                                        a large number of wallets efficiently.
                                        <br />
                                        <br /> Secondly, recognizing a gap in the market for reliable airdrop claim
                                        platforms, we took the initiative to develop one specifically for Solana
                                        projects. This new platform will operate under a brand separate from Sam for
                                        clarity and to maintain focus on providing a seamless airdrop experience.
                                    </p>
                                </div>
                            </article>

                            <article class="faq-accordion">
                                <input type="checkbox" class="tgg-title" id="tgg-title-2" />

                                <div class="faq-accordion-title">
                                    <label for="tgg-title-2">
                                        <h2>I own a Saga smartphone. Why am I not eligible for this airdrop? </h2>
                                        <span class="arrow-icon">
                                            <img src="https://raw.githubusercontent.com/Romerof/FAQ-accordion-card/main/images/icon-arrow-down.svg" />
                                        </span>
                                    </label>
                                </div>

                                <div class="faq-accordion-content">
                                    <p>
                                        In order to conserve Solana rent fees, we have filtered the ~127k Saga addresses
                                        for 'active' wallets first, given many wallets may not ever be used. If we have
                                        not included you on the whitelist, you can request to be added here [link].
                                        We'll typically process your requests within 48-72 hours.
                                    </p>
                                </div>
                            </article>

                            <article class="faq-accordion">
                                <input type="checkbox" class="tgg-title" id="tgg-title-2" />

                                <div class="faq-accordion-title">
                                    <label for="tgg-title-2">
                                        <h2>How do I know the claim site is actually secure?</h2>
                                        <span class="arrow-icon">
                                            <img src="https://raw.githubusercontent.com/Romerof/FAQ-accordion-card/main/images/icon-arrow-down.svg" />
                                        </span>
                                    </label>
                                </div>

                                <div class="faq-accordion-content">
                                    <p>
                                        Your security is a top priority for us. To ensure the authenticity and safety of
                                        the airdrop claim, we've linked the claim page directly to our official domain (
                                        <a href="www.sambankmeme.com/claim" target="_blank">
                                            {' '}
                                            www.sambankmeme.com/claim
                                        </a>{' '}
                                        or{' '}
                                        <a href="claim.sambankmeme.com" target="_blank">
                                            claim.sambankmeme.com
                                        </a>
                                        ).
                                        <br />
                                        <br />
                                        This step is taken to assure our community members that the site is managed by
                                        our trusted developers.
                                        <br />
                                        <br />
                                        As a precaution, you are always welcome to set up a new wallet specifically for
                                        all future $SBF airdrops moving forward.
                                    </p>
                                </div>
                            </article>

                            <article class="faq-accordion">
                                <input class="tgg-title" type="checkbox" id="tgg-title-3" />

                                <div class="faq-accordion-title">
                                    <label for="tgg-title-3">
                                        <h2>Is there any way to verify the security of the claim site's code?</h2>
                                        <span class="arrow-icon">
                                            <img src="https://raw.githubusercontent.com/Romerof/FAQ-accordion-card/main/images/icon-arrow-down.svg" />
                                        </span>
                                    </label>
                                </div>

                                <div class="faq-accordion-content">
                                    <p>
                                        Yes! In the spirit of transparency, we've open-sourced the claim page code. This
                                        move allows anyone interested to review and verify the security measures we've
                                        put in place. Open-sourcing the code demonstrates our commitment to creating a
                                        safe environment for our community to claim their $SBF tokens.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default FAQ;
