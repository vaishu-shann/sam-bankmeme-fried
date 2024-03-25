import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    useAnchorWallet,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import React, { FC, ReactNode, useMemo } from "react";
import idl from "./services/idl.json";

// console.log(idl);

require("./App.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const HomeNew: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default HomeNew;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const wallet = useAnchorWallet();
    const baseAccount = web3.Keypair.generate();

    function getProvider() {
        if (!wallet) {
            return null;
        }

        // const network = "http://127.0.0.1:8899";
        const connection = new Connection(web3.clusterApiUrl("devnet"), "confirmed");

        const provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: "confirmed",
        });

        return provider;
    }

    async function createCounter() {
        const provider = getProvider();

        if (!provider) {
            return;
        }

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, "6mnNGTZiWSp4bJsCxea1bvi4DTsD1opZhDwbfneYzbsD", provider);
        try {
            const data = await program.account.global.fetch("2VCJnP9gZkAeejwbDFaNpCbNTCRAjDx7xR9zXKbSPFyn");

            // await program.rpc.initialize({
            //     accounts: {
            //         myAccount: baseAccount.publicKey,
            //         user: provider.wallet.publicKey,
            //         systemProgram: web3.SystemProgram.programId,
            //     },
            //     signers: [baseAccount]
            // });

            // const account = await program.account.myAccount.fetch(baseAccount.publicKey);
            console.log('account: ', data);
            console.log('account: ', data.toString());
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }
    }

    async function increment() {
        const provider = getProvider();

        if (!provider) {
            return;
        }

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, "4v4Bqq5csejnc764wWiXxnT3M5iid3uR1HFJVrpLd6ni", provider);
        try {
            await program.rpc.increment({
                accounts: {
                    myAccount: baseAccount.publicKey,
                },
            });

            const account = await program.account.myAccount.fetch(baseAccount.publicKey);
            // console.log('account: ', account.data.toString());
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }
    }

    async function decrement() {
        const provider = getProvider();

        if (!provider) {
            return;
        }

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, "4v4Bqq5csejnc764wWiXxnT3M5iid3uR1HFJVrpLd6ni", provider);
        try {
            await program.rpc.decrement({
                accounts: {
                    myAccount: baseAccount.publicKey,
                },
            });

            const account = await program.account.myAccount.fetch(baseAccount.publicKey);
            // console.log('account: ', account.data.toString());
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }
    }

    async function update() {
        const provider = getProvider();
        if (!provider) {
            return;
        }

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, "4v4Bqq5csejnc764wWiXxnT3M5iid3uR1HFJVrpLd6ni", provider);
        try {
            await program.rpc.update(new BN(100), {
                accounts: {
                    myAccount: baseAccount.publicKey,
                },
            });

            const account = await program.account.myAccount.fetch(baseAccount.publicKey);
            // console.log('account: ', account.data.toString());
        }
        catch (err) {
            console.log("Transcation error: ", err);
        }
    }

    return (
        <div className="App">
            <button onClick={createCounter}>Initialize</button>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={update}>Update</button>
            <WalletMultiButton />
        </div>
    );
};
