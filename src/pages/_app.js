import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import "@/styles/custom.css";
import { ethers, Wallet, BigNumber } from "ethers";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Stake from "../../artifacts/contracts/Stake.sol/NFTStake.json";
import NFTCollection from "../../artifacts/contracts/NFTCollection.sol/NFTCollection.json";
import xChainPolygon from "../../artifacts/contracts/xChainPolygon.sol/xChainPolygon.json";
import CollectionFactory from "../../artifacts/contracts/CollectionFactory.sol/CollectionFactory.json";
import uma_verification from "../../artifacts/contracts/UMAVerification.sol/UMAVerify.json";
import UMA_factory_contract from "../../artifacts/contracts/UMAFactory.sol/UMAFactory.json";
import { IntmaxWalletSigner } from "webmax";
import axios from "axios";
import * as PushAPI from "@pushprotocol/restapi";
import { Polybase } from "@polybase/client";
import { PolybaseProvider } from "@polybase/react";
import { ethPersonalSign } from "@polybase/eth";
import { create } from "@connext/sdk";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const wallet = new Wallet(process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY);

  const storage = new ThirdwebStorage({
    clientId: "927a9cfa9200d24aa49f809579e6d3a6",
    secretKey:
      "X23xf6MkiduQN8zLZ17g53ED9m37t1ijSXs0tSHCNLe_g-XamRUbslpnCylF_OHR8Rjqrs3f9DSgbupFlTvGgQ",
  });
  //SIGNER INFORMATION
  const [signer, setSigner] = useState();
  const [provider, set_provider] = useState();
  const [chainIdMain, setChainIdMain] = useState();
  const [signer_address, set_signer_address] = useState("");
  const [signer_bal, set_signer_bal] = useState(0);
  const [format_signer_bal, set_format_signer_bal] = useState(0);
  const [nfts, set_nfts] = useState([]);
  const [search_data] = useState(nfts);
  const [artists, set_artists] = useState([]);
  const [chainId, set_current_chainId] = useState();
  const [marketplace_collection, setMarketplaceCollection] = useState();

  //COLLECTIONS INFORMATION
  const [all_collections, set_collections] = useState([]);

  // push channel address
  const RARX_CHANNEL_ADDRESS = "0x7671A05D4e947A7E991a8e2A92EEd7A3a9b9A861";

  // xChain address
  const x_chain_polygon_address = "0xC62404FcaD906f7b438e35DBb437404EaE99Ed11";
  const x_chain_goerli_address = "0x9CBe30e67Ac44f5f8911615e68E1463a26DcdA83";

  // xchain official hashi contracts
  const x_hashi_polygon = "0xd3F1A0782AFD768f8929343Fb44344A2a49fE343";
  const x_hashi_goerli = "0x8F5969b8Fa3727392385C5E74CF1AA91a4aC4b40";

  //UMA CONTRACT FACTORY
  const uma_contract_factory = "0xf45DfC08119414846D8384eB2f2cdF1a2a03aB83";

  // chain configs
  const [chainImg, setChainImg] = useState("");
  const [blockURL, setBlockURL] = useState("");
  const [symbol, setSymbol] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [defaultCollectionAddress, setCollectionAddress] = useState("");
  const [marketplaceAddress, setMarketplaceAddress] = useState("");
  const [stakingContract, setStakingContract] = useState("");

  const [collectionFactoryAddress, setCollectionFactoryAddress] = useState("");
  const [txnHashCollection, setTxnHashCollection] = useState("");

  // declaring images
  const filecoinLogo = "chains/filecoin.png";
  const gnosisLogo = "chains/gnosis.png";
  const goerliLogo = "chains/goerli.png";
  const mantleLogo = "chains/mantle.png";
  const polygonLogo = "chains/polygon.png";
  const bscLogo = "chains/bsc.png";
  const scrollLogo = "chains/scroll.png";
  const TaikoLogo = "chains/taiko.png";

  // connect wallet metamask
  const connectToWallet = async () => {
    const db = await polybase();
    del_nft();
    // delete_user();
    // delete_collection();
    // create_Marketplace_user();
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      set_provider(provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);

      const user_address = await signer.getAddress();
      set_signer_address(user_address);

      const checkUser = await db
        .collection("User")
        .where("id", "==", user_address)
        .get();
      if (checkUser.data.length === 0) {
        const res = await db
          .collection("User")
          .create([user_address, "", "", "", "", "", user_address, false, ""]);
      }

      const user_balance = await signer.getBalance();
      const signerToStr = ethers.utils.formatEther(user_balance.toString());
      set_signer_bal(signerToStr);

      const formatBalance = parseFloat(signerToStr).toFixed(2);
      set_format_signer_bal(formatBalance);

      const { chainId } = await provider.getNetwork();
      set_current_chainId(chainId);

      if (chainId == 56) {
        // bsc
        setCollectionAddress("0x870696c21EA3f46bb9Acf84F71973246E4EFa239");
        setMarketplaceCollection("0xA489aB9Bb841c772192f8fF9Ca7f74be5A42C793");
        setMarketplaceAddress("0x17c309d1fd44463f5B94f95A33bcE3BaC383Ea68");
        setCollectionFactoryAddress(
          "0x01c00C36C431017aF981D9C4B7DAc551c3310D9F"
        );
        setStakingContract("0xC4632C27b4D85164A344A7d4A766513b6F7fcE94");
        setChainImg(bscLogo);
        setSymbol("BNB");
        setBlockchain("BSC Mainnet");
        setBlockURL("https://bscscan.com/");
      } else if (chainId == 80001) {
        // matic
        setCollectionAddress("0xcB6BD973E79Ff196B50F9c32076E6c2e145a46cd");
        setMarketplaceAddress("0xcF5CB7c9ae635524f691AdeC6743d835cC2d4908");
        setMarketplaceCollection("0xcB6BD973E79Ff196B50F9c32076E6c2e145a46cd");
        setCollectionFactoryAddress(
          "0x2c8Db32cDf0Ec95A1194Fe2842A4168a69ed556f"
        );
        setStakingContract("0xbEb37A34CAa2cC6b0641EaeC8D08326fc3Ad5F40");
        setChainImg(polygonLogo);
        setSymbol("MATIC");
        setBlockchain("Polygon Mumbai");
        setBlockURL("https://mumbai.polygonscan.com/");
      }
      // create_marketplace_acc();
      await setChainIdMain(chainId);
    } else {
      console.log("No wallets detected");
    }
  };

  // signing out wallet
  const signOut = async () => {
    set_signer_address("");
    setSigner();
  };

  // deafult nft collection polybase polybase
  // create default nft collection polybase
  const create_NFTCollection_default = async (
    collection_address,
    blockchain,
    chainImg,
    blockURL
  ) => {
    const db = await polybase();

    const checkUser = await db
      .collection("Collection")
      .where("id", "==", defaultCollectionAddress)
      .get();
    if (checkUser.data.length === 0) {
      const res = await db
        .collection("Collection")
        .create([
          defaultCollectionAddress,
          await db
            .collection("User")
            .record("0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9")?.collection
            .id,
          "Shiba Lite - Lite Guys",
          "https://img.tofunft.com/v2/56/0x870696c21ea3f46bb9acf84f71973246e4efa239/25/720/static.jpg",
          "https://cdn.tofunft.com/covers/6baoxm8yc1b084e.png/1440.png",
          "Lite Guys",
          "If you missed #ShibaInu you don't want to miss ShibaLite 💎 A community driven #Crypto which rewards holders & donates",
          db
            .collection("User")
            .record("0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9"),
          "0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9",
          "chains/bsc.png",
          true,
        ]);
    }

    const checkUser1 = await db
      .collection("Collection")
      .where("id", "==", marketplace_collection)
      .get();

    if (checkUser1.data.length === 0) {
      const res = await db
        .collection("Collection")
        .create([
          marketplace_collection,
          await db
            .collection("User")
            .record("0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9")?.collection
            .id,
          "Shiba Lite - Marketplace Collection",
          "https://img.tofunft.com/v2/56/0x870696c21ea3f46bb9acf84f71973246e4efa239/25/720/static.jpg",
          "https://cdn.tofunft.com/covers/6baoxm8yc1b084e.png/1440.png",
          "Lite Guys",
          "If you missed #ShibaInu you don't want to miss ShibaLite 💎 A community driven #Crypto which rewards holders & donates",
          db
            .collection("User")
            .record("0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9"),
          "0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9",
          "chains/bsc.png",
          true,
        ]);
    }
  };

  // delete user polybase chain_method
  const delete_user = async () => {
    const db = await polybase();
    const res = await db
      .collection("User")
      .record("0xEa96732cd48db4e123B6E271207bC454e003422e")
      .call("del");
  };

  const del_nft = async () => {
    const db = await polybase();
    const res = await db
      .collection("NFT")
      .record()
      .where("collectionId", "==", "0xcB6BD973E79Ff196B50F9c32076E6c2e145a46cd")
      // .record("nftid")
      .call("del");
  };

  // delete collection polybase chain_method
  const delete_collection = async () => {
    const db = await polybase();
    const res = await db
      .collection("Collection")
      .record("0x488cf7194C5909BC5a26469b321a21aE704E5A2A")
      .call("del");
    console.log(res, "delete_collection");
  };

  // create marketplace user polybase chain_method
  const create_Marketplace_user = async () => {
    const db = await polybase();
    const checkUser = await db
      .collection("User")
      .where("id", "==", "0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9")
      .get();
    if (checkUser.data.length === 0) {
      const res = await db
        .collection("User")
        .create([
          "0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9",
          "LiteGuys Admin",
          "https://img.tofunft.com/v2/56/0x870696c21ea3f46bb9acf84f71973246e4efa239/25/720/static.jpg",
          "https://cdn.tofunft.com/covers/6baoxm8yc1b084e.png/1440.png",
          "If you missed #ShibaInu you don't want to miss ShibaLite 💎 A community driven #Crypto which rewards holders & donates.",
          "email",
          "0x8ab7C842935F9C652Da3370E1ce9d592569a3fb9",
          false,
          "",
        ]);
    }
  };

  // CONNECT WALLET INTMAX
  const connectToIntmax = async () => {
    try {
      const signerIntmax = new IntmaxWalletSigner();
      const accountIntmax = await signerIntmax.connectToAccount();
      setSigner(signerIntmax);
      set_signer_address(accountIntmax.address);
      setChainIdMain(accountIntmax.chainId);
    } catch (error) {
      console.log(error.message);
    }
  };

  // UMA Functions here
  const UMA_contract = () => {
    const contract = new ethers.Contract(
      uma_contract_factory,
      UMA_factory_contract.abi,
      signer
    );
    return contract;
  };

  // deploying UMA contract
  const deploy_uma = async (collection_address) => {
    try {
      const contract = UMA_contract();
      // AFTER EVENT EMIT...SAVING DATA ON POLYBASE
      contract.on(
        "UMA_Created",
        async (current_count, collection_address, current_uma) => {
          const db = await polybase();
          const res = await db
            .collection("Collection")
            .record(collection_address)
            .call("start_verification", [current_uma]);
          // console.log({ res });
        }
      );
      // ON CHAIN TRANSACTION
      const txn = await contract.deploy_uma(collection_address);
    } catch (error) {
      console.log(error);
    }
  };

  // triggering requestData function
  const request_verification_UMA = async (collection_address) => {
    try {
      const db = await polybase();
      const res = await db
        .collection("Collection")
        .record(collection_address)
        .get();

      const contract = new ethers.Contract(
        res.data.uma_contract,
        uma_verification.abi,
        signer
      );

      const txn = await contract.requestData();

      if (txn.hash) {
        const res = await db
          .collection("Collection")
          .record(collection_address)
          .call("start_request");

        setTxnHashCollection(txn.hash);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // triggering uma settle
  const uma_settle_request = async (collection_address) => {
    try {
      const db = await polybase();
      const res = await db
        .collection("Collection")
        .record(collection_address)
        .get();
      const contract = new ethers.Contract(
        res.data.uma_contract,
        uma_verification.abi,
        signer
      );

      const txn = await contract.settleRequest();

      if (txn.hash) {
        const res = await db
          .collection("Collection")
          .record(collection_address)
          .call("settle_verification");
      }
    } catch (error) {
      alert("Please self-verify your transaction on UMA OO first");
    }
  };

  // getting status of uma
  const uma_get_settle_status = async (collection_address) => {
    // console.log({ collection_address });
    if (!collection_address) return;
    try {
      const db = await polybase();
      const res = await db
        .collection("Collection")
        .record(collection_address)
        .get();
      // console.log({ contract: res.data.uma_contract });
      const contract = new ethers.Contract(
        res.data.uma_contract,
        uma_verification.abi,
        signer
      );
      const txn = await contract.getSettledData();
      // console.log({ settleStatus: txn.toString() });
    } catch (error) {
      console.log(error.message);
    }
  };

  // end of UMA functions

  // polbase function start here
  const fetch_collections_polybase = async (user_address) => {
    try {
      const db = await polybase();

      const collections = await db
        .collection("Collection")
        .where("ownerWallet", "==", user_address)
        .get();

      // console.log(collections, "etem1");
      let fetched_collections = [];
      for (const e of collections.data) {
        // console.log(e, "etem");
        const obj = {};
        obj.collection_address = e.data.id;
        obj.coverImage = e.data.coverImage;
        obj.description = e.data.description;
        obj.logo = e.data.logo;
        obj.name = e.data.name;
        obj.owner_name = e.data.owner.id;
        obj.symbol = e.data.symbol;
        obj.chain_image = e.data.chain_image;
        obj.isCollectionVerified = e.data.isCollectionVerified;
        obj.chain_block = e.data.chain_block;
        fetched_collections.push(obj);
      }

      return fetched_collections;
    } catch (error) {
      console.log(error.message);
    }
  };

  // marketplace
  const marketplace = () => {
    const marketplace_contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    return marketplace_contract;
  };

  const stake = () => {
    const stake_contract = new ethers.Contract(
      stakingContract,
      Stake.abi,
      signer
    );
    return stake_contract;
  };

  const fetch_artists = async () => {
    try {
      const db = await polybase();
      const res = await db
        .collection("User")
        .where("isArtist", "==", true)
        .get();
      set_artists(res.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const cancel_listing = async (collection_address, tokenId) => {
    const contract = marketplace();
    const txn = await contract.cancelListing(collection_address, tokenId);
    await txn.wait();

    const db = await polybase();
    const res = await db
      .collection("NFT")
      .record(`${collection_address}/${tokenId}`)
      .call("cancel_listing");
  };

  // fetch listed nft
  const fetch_listed_nfts = async () => {
    try {
      const db = await polybase();
      let nfts = [];
      const res = await db
        .collection("NFT")
        .where("isListed", "==", true)
        .get();
      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice
          ? ethers.utils.formatEther(e.data.listingPrice)
          : "";
        obj.owner = e.data.owner.id;
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = await e.data.ipfsURL?.replace(
          /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
          "https://ipfs.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  // lsit nft for sale
  const list_nft = async (tokenId, price, collection_address, signer) => {
    // console.log({
    //   tokenId,
    //   price,
    //   collection_address,
    //   signer,
    //   marketplaceAddress,
    // });
    const user_address = await signer.getAddress();

    const collection_contract = rarx_collection(collection_address, signer);
    try {
      const txnApproval = await collection_contract.setApprovalForAll(
        marketplaceAddress,
        true
      );
      await txnApproval.wait();
      const contract = marketplace();

      const txn = await contract.ListToken(
        tokenId,
        ethers.utils.parseEther(price),
        collection_address,
        {
          value: ethers.utils.parseEther("0.01"),
        }
      );
      await txn.wait();

      const nftRec = await contract.nft_record(collection_address, tokenId);
      if (txn.hash) {
        const db = await polybase();
        const res = await db
          .collection("NFT")
          .record(`${collection_address}/${tokenId}`)
          .call("listNFT", [
            ethers.utils.parseEther(price).toString(),
            chainIdMain.toString(),
            // db.collection("User").record(marketplaceAddress.toLowerCase()),
          ]);
        // console.log({ polybaseres: res });

        sendNFTListNoti(tokenId, price);
        setTimeout(() => {
          router.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const stake_nft = async (tokenId) => {
    // console.log({
    //   tokenId,
    //   price,
    //   collection_address,
    //   signer,
    //   marketplaceAddress,
    // });
    // const user_address = await signer.getAddress();
    const collection_contract = rarx_collection(
      defaultCollectionAddress,
      signer
    );
    try {
      const txnApproval = await collection_contract.setApprovalForAll(
        stakingContract,
        true
      );
      await txnApproval.wait();
      const contract = stake();

      const txn = await contract.stake(tokenId, {
        gasLimit: 500000,
      });
      await txn.wait();

      const stakeRec = await contract.stakers(signer_address);
      console.log(stakeRec, "stakeRec");
      if (txn.hash) {
        const db = await polybase();
        const res = await db
          .collection("NFT")
          .record(`${defaultCollectionAddress}/${tokenId}`)
          .call("updateStake", [true]);
        // console.log({ polybaseres: res });

        sendNFTStakeNoti(tokenId);
        setTimeout(() => {
          router.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const unstake_nft = async (tokenId) => {
    // console.log({
    //   tokenId,
    //   price,
    //   collection_address,
    //   signer,
    //   marketplaceAddress,
    // });
    // const user_address = await signer.getAddress();
    const collection_contract = rarx_collection(
      defaultCollectionAddress,
      signer
    );
    try {
      // const txnApproval = await collection_contract.setApprovalForAll(
      //   stakingContract,
      //   true
      // );
      // await txnApproval.wait();
      const contract = stake();

      const txn = await contract.withdraw(tokenId, {
        gasLimit: 500000,
      });
      await txn.wait();

      const stakeRec = await contract.stakers(signer_address);
      console.log(stakeRec, "stakeRec");
      if (txn.hash) {
        const db = await polybase();
        const res = await db
          .collection("NFT")
          .record(`${defaultCollectionAddress}/${tokenId}`)
          .call("updateStake", [false]);
        // console.log({ polybaseres: res });

        sendNFTunStakeNoti(tokenId);
        setTimeout(() => {
          router.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const claim_reward = async () => {
    const contract = stake();

    const txn = await contract.claimRewards({
      gasLimit: 500000,
    });
    await txn.wait();
  };

  const available_reward = async () => {
    if (!stakingContract) return;
    console.log(stakingContract, "stakingContract");
    const contract = new ethers.Contract(stakingContract, Stake.abi, provider);
    const txn = await contract.availableRewards(signer_address);

    return ethers.utils.formatEther(txn);
  };

  // execute sales
  const executeSale = async (tokenId, collection_address, listing_price) => {
    console.log({ tokenId, collection_address, listing_price });
    const db = await polybase();

    const res = await db
      .collection("NFT")
      .record(`${collection_address}/${tokenId}`)
      .get();
    try {
      const contract = marketplace();
      const txn = await contract.executeSale(tokenId, collection_address, {
        value: ethers.utils.parseEther(listing_price),
      });
      await txn.wait();
      if (txn.hash) {
        const res = await db
          .collection("NFT")
          .record(`${collection_address}/${tokenId}`)
          .call("executeSale", [db.collection("User").record(signer_address)]);
      }
      sendNFTSaleNoti(tokenId, listing_price);
    } catch (error) {
      console.log(error.message);
    }
  };

  // rarx collections
  const rarx_collection = (collection_address, signer) => {
    if (!collection_address) return;
    const collection_contract = new ethers.Contract(
      collection_address,
      NFTCollection.abi,
      signer
    );
    return collection_contract;
  };

  // connext sdk config
  const SdkConfig = {
    signerAddress: signer_address,
    network: "testnet",
    environment: "staging",
    chains: {
      1735353714: {
        providers: ["https://rpc.ankr.com/eth_goerli"],
      },
      9991: {
        providers: ["https://matic-mumbai.chainstacklabs.com"],
      },
    },
  };

  // cross chain call main function
  const xChain_Contract_Call = (_xChainContract, signer) => {
    if (!_xChainContract) return;
    const x_chain_contract = new ethers.Contract(
      _xChainContract,
      xChainPolygon.abi,
      signer
    );
    return x_chain_contract;
  };

  //connext xchain function here
  const xchain_NFT = async (
    AssetCollection,
    AssetTokenID,
    xChainContract,
    domainID
  ) => {
    try {
      // getting relayer fee
      let relayerMain;

      // setting default values
      let chain_Image;
      let chain_symbol;
      let chain_block;
      const polygonDomain = "9991";
      const goerliDomain = "1735353714";

      // initiating sdk
      const { sdkBase } = await create(SdkConfig);

      // selecting destination domain, relayer fee and data
      if (domainID == "1735353714") {
        const relayerFee = await sdkBase.estimateRelayerFee({
          originDomain: polygonDomain,
          destinationDomain: domainID,
        });
        relayerMain = relayerFee;
        chain_Image = "chains/goerli.png";
        chain_symbol = "ETH";
        chain_block = "https://goerli.etherscan.io/";
      }
      if (domainID == "9991") {
        const relayerFee = await sdkBase.estimateRelayerFee({
          originDomain: goerliDomain,
          destinationDomain: domainID,
        });
        relayerMain = relayerFee;
        chain_Image = "chains/polygon.png";
        chain_symbol = "MATIC";
        chain_block = "https://mumbai.polygonscan.com/";
      }

      // approving contract
      let fromChainID = 0;
      let xChainID = 0;
      try {
        const collectionContract = rarx_collection(AssetCollection, signer);

        // approve our xchain contract
        const approveTxn = await collectionContract.setApprovalForAll(
          xChainContract,
          true
        );
        await approveTxn.wait();

        // approve nfthashi polygon contract
        if (domainID == "1735353714") {
          const approveHashiTxn = await collectionContract.setApprovalForAll(
            x_hashi_polygon,
            true
          );
          fromChainID = 80001;
          xChainID = 5;
          await approveHashiTxn.wait();
        }
        // approve nfthashi goerli contract
        if (domainID == "9991") {
          const approveHashiTxn = await collectionContract.setApprovalForAll(
            x_hashi_goerli,
            true
          );
          fromChainID = 5;
          xChainID = 80001;
          await approveHashiTxn.wait();
        }
      } catch (error) {
        console.log({ approveError: error });
      }

      // sending xchain call
      try {
        const crossChainPolygon = xChain_Contract_Call(xChainContract, signer);

        // currently sending 0 fees as relayerfee because no nfts can get bridged because of high relayerfees, don't have more than 1 matic on testnet
        const sendXChainPolygon = await crossChainPolygon.XChainCall(
          domainID,
          "0",
          "5000",
          AssetCollection,
          signer_address,
          AssetTokenID,
          "true"
        );
        await sendXChainPolygon.wait();
        const Txnhash = await sendXChainPolygon.hash;

        // saving nft bridging info and updating NFT in polybase
        const obj = {
          txn_hash: Txnhash,
          from_chain_id: fromChainID,
          asset_collection: AssetCollection,
          asset_tokenId: AssetTokenID,
        };

        const parsed_data = JSON.stringify(obj);
        const db = await polybase();

        const save_transaction = await db
          .collection("User")
          .record(signer_address)
          .call("add_transaction", [parsed_data]);

        const update_NFTChain = await db
          .collection("NFT")
          .record(`${AssetCollection}/${AssetTokenID}`)
          .call("nft_bridge", [
            xChainID.toString(),
            chain_Image,
            chain_symbol,
            chain_block,
          ]);
      } catch (error) {
        console.log({ XCallError: error });
      }
    } catch (error) {
      console.log({ someCatchError: error });
    }
  };

  // deploy collections
  const collection_contract_factory = (signer) => {
    const collection_factory = new ethers.Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );
    return collection_factory;
  };

  // create nft
  const create_token = async (_tokenURI, signer) => {
    try {
      // console.log(_tokenURI);
      const { name, properties, description } = _tokenURI;
      const tokenURI = await storage.upload(_tokenURI);
      console.log(_tokenURI, "tokenURI");
      const rarx = rarx_collection(_tokenURI.collection, signer);
      const network = await provider.getNetwork();

      let chain_Image;
      let chain_symbol;
      let chain_block;

      if (symbol == "ETH") {
        chain_Image = "chains/goerli.png";
        chain_symbol = "ETH";
        chain_block = "https://etherscan.io/";
      }
      if (symbol == "BNB") {
        chain_Image = "chains/bsc.png";
        chain_symbol = "BNB";
        chain_block = "https://bscscan.com/";
      } else {
        chain_Image = "chains/polygon.png";
        chain_symbol = "MATIC";
        chain_block = "https://mumbai.polygonscan.com/";
      }

      await rarx.on("TokenCreated", async (ipfsURL, tokenId) => {
        // console.log({ ipfsURL, tokenId });

        try {
          const db = await polybase();
          if (
            name !== null &&
            ipfsURL !== null &&
            description !== null &&
            properties !== null
          ) {
            const res = await db
              .collection("NFT")
              .create([
                `${_tokenURI?.collection}/${tokenId.toString()}`,
                _tokenURI?.collection,
                tokenId.toString(),
                network.chainId.toString(),
                tokenURI,
                db.collection("User").record(signer_address),
                db.collection("Collection").record(_tokenURI.collection),
                properties[0].type == "" ? "" : JSON.stringify(properties),
                name,
                ipfsURL,
                description,
                false,
                signer_address,
                chain_block,
                chain_Image,
                chain_symbol,
                ipfsURL,
                "0",
              ]);
          }
          console.log({ polybaseres: res });
          console.log("res", res);
        } catch (e) {
          console.error("db error", e);
        }
      });

      const txn = await rarx.createToken(tokenURI);
      await txn.wait();
      // console.log({ txn });
      sendNFTMintNoti();
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE COLLECTION
  const create_collection = async (data) => {
    try {
      const collection_logo = await storage.upload(data.logo);
      const collection_image = await storage.upload(data.image);
      const collection_factory = collection_contract_factory(signer);

      let chain_Image;
      let chain_symbol;
      let chain_block;

      if (symbol == "ETH") {
        chain_Image = "chains/goerli.png";
        chain_symbol = "ETH";
        chain_block = "https://etherscan.io/";
      }
      if (symbol == "BNB") {
        chain_Image = "chains/bsc.png";
        chain_symbol = "BNB";
        chain_block = "https://bscscan.com/";
      } else {
        chain_Image = "chains/polygon.png";
        chain_symbol = "MATIC";
        chain_block = "https://mumbai.polygonscan.com/";
      }

      // console.log({ collection_logo, collection_image });

      collection_factory.on(
        "CollectionCreated",
        async (
          collectionId,
          name,
          symbol,
          description,
          image,
          logo,
          owner,
          collection_address
        ) => {
          const db = await polybase();
          // console.log(
          //   "collection",
          //   db.collection("User").record(signer_address)
          // );
          const res = await db.collection("Collection").create([
            collection_address,
            await db.collection("User").record(signer_address)?.collection.id,
            name,
            logo,
            image,
            symbol,
            description,
            db.collection("User").record(signer_address),
            signer_address,
            chain_Image,
            false,
            // chainImg,
            // blockURL,
          ]);
          // console.log(res);
          // console.log({ polybase: res });
        }
      );
      const txn = await collection_factory.create_collection(
        data.name,
        data.symbol,
        collection_image,
        collection_logo,
        data.description
      );
      await txn.wait();
      sendCollectionNoti({ collectionName: data.name });
    } catch (error) {
      alert(error.message);
    }
  };

  //FETCHES SINGLE NFT INFO
  const fetch_NFT_info = async (collection_address, tokenId) => {
    try {
      const db = await polybase();
      let obj = {};
      const res = await db
        .collection("NFT")
        .record(`${collection_address}/${tokenId}`)
        .get();
      const collectionInfo = await db
        .collection("Collection")
        .record(collection_address)
        .get();
      const ownerInfo = await db
        .collection("User")
        .record(res.data.owner.id)
        .get();
      obj.nft_properties = res.data.attributes
        ? JSON.parse(res.data.attributes)
        : [];
      // COLLECTION INFO
      obj.collectionLogo = collectionInfo.data.logo;
      obj.collection_name = collectionInfo.data.name;
      obj.collection_id = collectionInfo.data.id;
      obj.collection_owner = collectionInfo.data.owner.id;
      obj.collection_symbol = collectionInfo.data.symbol;
      //OWNER INFO
      obj.ownerImage = ownerInfo.data.profileImage;
      obj.owner_username = res.data.username;
      obj.seller = res.data.seller?.id;
      obj.user_id = ownerInfo.data.id;
      // NFT INFO
      obj.chainId = res.data.chainId;
      obj.isListed = res.data.isListed;
      obj.listingPrice = res.data.listingPrice
        ? ethers.utils.formatEther(res.data.listingPrice)
        : "";
      obj.nft_owner = res.data.owner.id;
      obj.chain_block = res.data.chain_block;
      obj.chain_image = res.data.chain_image;
      obj.chain_symbol = res.data.chain_symbol;
      const parsed_nft = await axios.get(
        res.data.ipfsURL?.replace(
          /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
          "https://ipfs.io/ipfs/"
        )
      );
      obj.ipfsData = parsed_nft.data;
      return obj;
    } catch (error) {
      console.log(error.message);
    }
  };

  // GETS ALL COLLECTIONS FROM POLYBASE
  const get_all_collections = async () => {
    try {
      const db = await polybase();
      const collections = await db.collection("Collection").get();
      // console.log(collections, "db");
      const allCollections = [];
      collections.data.map((e) => {
        const { data } = e;
        allCollections.push(data);
      });
      // console.log({ allCollections });
      set_collections(allCollections);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get specific user collections
  const get_my_collections = async (signer) => {
    try {
      const collection = collection_contract_factory(signer);
      const my_collections = await collection.getMyCollections();
      return my_collections;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetch_collection_data_from_polybase = async (collection_address) => {
    try {
      const db = await polybase();
      const res = await db
        .collection("Collection")
        .where("id", "==", collection_address)
        .get();
      return res;
    } catch (error) {
      alert(error.message);
    }
  };

  // FETCHES NFT FROM COLLECTION
  const fetch_nfts_from_collection = async (collection_address) => {
    try {
      const db = await polybase();

      let nfts = [];
      const res = await db
        .collection("NFT")
        .where("collectionId", "==", collection_address)
        .get();

      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice
          ? ethers.utils.formatEther(e.data.listingPrice)
          : "";
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = await e.data.ipfsURL?.replace(
          /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
          "https://ipfs.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  //FETCHES ALL THE NFTS FROM POLYBASE
  const fetch_all_nfts_from_polybase = async () => {
    try {
      const db = await polybase();
      const res = await db.collection("NFT").get();
      let nfts = [];
      // console.log(nfts, "nfts");
      // console.log(res.data, "res");
      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice
          ? ethers.utils.formatEther(e.data.listingPrice)
          : "";
        obj.nft_name = e.data?.name ? e.data?.name : "";
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = e.data.ipfsURL?.replace(
          /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
          "https://ipfs.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      set_nfts(nfts);

      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  //FETCHES NFTS BY USER FROM POLYBASE
  const fetch_nfts_from_user_wallet = async (signer_address) => {
    try {
      // if (!signer_address) return;
      let nfts = [];
      const db = await polybase();
      const res = await db
        .collection("NFT")
        // .where("owner", "==", {
        //   collectionId: `${process.env.NEXT_PUBLIC_POLYBASE_NAMESPACE}/User`,
        //   id: signer_address,
        // })
        .where("ownerWallet", "==", signer_address)
        .get();

      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        obj.collectionId = e.data.collectionId;
        obj.isStaked = e.data.isStaked;
        const url = e.data.ipfsURL?.replace(
          /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
          "https://ipfs.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetch_nfts_by_chain = async () => {
    // console.log({ chainId });
    // console.log({ signer_address, chainId });
    try {
      const db = await polybase();
      const res = await db
        .collection("NFT")
        .where("ownerWallet", "==", signer_address)
        .where("chainId", "==", chainId?.toString())
        .get();
      let nfts = [];
      for (const e of res.data) {
        let obj = {};
        const ipfsURL = e.data.ipfsURL?.replace(
          /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
          "https://ipfs.io/ipfs/"
        );
        const res = await axios.get(ipfsURL);
        obj.nft_name = res.data.name;
        obj.nft_description = res.data.description;
        obj.image = res.data.image;
        obj.collection = res.data.collection;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice ? e.data.listingPrice : "";
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        nfts.push(obj);
      }

      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  // FETCH TRANSACTIONS
  const fetch_transacrions = async () => {
    // try {
    //   const db = await polybase();
    //   const res = await db.collection("User").
    // } catch (error) {}
  };

  // sending collection verification notification
  const sendCollectionNoti = async ({ collectionName }) => {
    try {
      // console.log(NftName, NftPrice);
      toast.success(
        `Congratulations, now you can sell your nfts via your ${collectionName} collection`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (e) {
      console.log(e);
    }
    // const signer = new ethers.Wallet(
    //   `${process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY}`
    // );
    // try {
    //   const apiResponse = await PushAPI.payloads.sendNotification({
    //     signer,
    //     type: 3,
    //     identityType: 2,
    //     notification: {
    //       title: `Your new collection ${collectionName} on rarx is verified`,
    //       body: `Congratulations, now you can sell your nfts via your ${collectionName} collection`,
    //     },
    //     payload: {
    //       title: `Your new collection on rarx is verified`,
    //       body: `Congratulations, now you can sell your nfts via your collection`,
    //     },
    //     recipients: `eip155:80001:${signer_address}`,
    //     channel: `eip155:80001:${RARX_CHANNEL_ADDRESS}`,
    //     env: "staging",
    //   });
    // } catch (err) {
    //   console.error("Error: ", err);
    // }
  };

  // sending nft list notification
  const sendNFTListNoti = async (NftName, NftPrice) => {
    try {
      console.log(NftName, NftPrice);
      toast.success(
        "Congratulations, you have successfully listed id:" +
          NftName +
          "on sale for " +
          NftPrice +
          symbol,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const sendNFTStakeNoti = async (NftId) => {
    try {
      // console.log(NftName, NftPrice);
      toast.success(
        "Congratulations, you have successfully staked id:" + NftId,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const sendNFTunStakeNoti = async (NftId) => {
    try {
      // console.log(NftName, NftPrice);
      toast.success(
        "Congratulations, you have successfully unstaked id:" + NftId,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  // sending nft buy notification
  const sendNFTSaleNoti = async (NftName, NftPrice) => {
    try {
      toast.success(
        `Congratulations, you have successfully purchased ${NftName} for ${NftPrice}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (e) {
      console.log(e);
    }
    // const signer = new ethers.Wallet(
    //   `${process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY}`
    // );
    // try {
    //   const apiResponse = await PushAPI.payloads.sendNotification({
    //     signer,
    //     type: 3,
    //     identityType: 2,
    //     notification: {
    //       title: `You have purchased NFT ${NftName} for ${NftPrice}`,
    //       body: `Congratulations, you have successfully purchased ${NftName}`,
    //     },
    //     payload: {
    //       title: `You have purchased NFT ${NftName} for ${NftPrice}`,
    //       body: `Congratulations, you have successfully purchased ${NftName}`,
    //     },
    //     recipients: `eip155:80001:${signer_address}`,
    //     channel: `eip155:80001:${RARX_CHANNEL_ADDRESS}`,
    //     env: "staging",
    //   });
    // } catch (err) {
    //   console.error("Error: ", err);
    // }
  };

  // sending nft minted notification
  const sendNFTMintNoti = async () => {
    try {
      // console.log(NftName, NftPrice);
      toast.success(
        "Congratulations, now you can list your newly minted NFT on ShibLite",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (e) {
      console.log(e);
    }
    // const signer = new ethers.Wallet(
    //   `${process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY}`
    // );
    // try {
    //   const apiResponse = await PushAPI.payloads.sendNotification({
    //     signer,
    //     type: 3,
    //     identityType: 2,
    //     notification: {
    //       title: `Your new NFT is created onchain via ShibLite Marketplace`,
    //       body: `Congratulations, now you can list your newly minted NFT on Rarx`,
    //     },
    //     payload: {
    //       title: `Your new NFT is created onchain via ShibLite Marketplace`,
    //       body: `Congratulations, now you can list your newly minted NFT on Rarx`,
    //       cta: ``,
    //     },
    //     recipients: `eip155:8001:${signer_address}`,
    //     channel: `eip155:80001:${RARX_CHANNEL_ADDRESS}`,
    //     env: "staging",
    //   });
    // } catch (err) {
    //   console.error("Error: ", err);
    // }
  };

  // polybase db connect
  const polybase = async () => {
    const db = await new Polybase({
      baseURL: "https://testnet.polybase.xyz/v0",
      // defaultNamespace: process.env.NEXT_PUBLIC_POLYBASE_NAMESPACE,
      defaultNamespace:
        "pk/0x786916133b80b10cae1d9e9986449a518da4b0aadae9f6d8fda9b8bf24b39dd113d19c55df8299eb055f2e34dbefa822cb81ab69711da6ee93c7d5264e782245/shiblite-test",
      signer: async (data) => {
        return {
          h: "eth-personal-sign",
          sig: await wallet.signMessage(data),
        };
      },
    });

    return db;
  };

  const getUserData = async (user_address) => {
    try {
      const db = await polybase();
      const res = await db
        .collection("User")
        .record(user_address)
        .get();
      const {
        bio,
        coverImage,
        email,
        id,
        profileImage,
        username,
        socials,
        isArtist,
        membershipFees,
        perks,
        transactions,
      } = res.data;

      console.log({ transactions });
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateData = async (e, datas, set_loading) => {
    e.preventDefault();
    set_loading(true);

    try {
      let coverImg;
      let profileImg;

      if (typeof datas.coverImage === "object") {
        coverImg = await storage.upload(datas.coverImage);
      }
      if (typeof datas.profileImage === "object") {
        profileImg = await storage.upload(datas.profileImage);
      }
      console.log(datas);
      const db = await polybase();
      const res = await db
        .collection("User")
        .record(signer_address)
        .call("updateData", [
          datas.username,
          datas.email,
          datas.bio,
          profileImg ? profileImg : datas.profileImage,
          coverImg ? coverImg : datas.coverImage,
          JSON.stringify([datas.twitter, datas.instagram, datas.customLink]),
          datas.isArtist,
        ]);
      console.log(res);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
    set_loading(false);
  };

  const search_nft = async (query) => {
    try {
      const db = await polybase();
      let filtered_nfts = [];
      nfts.filter(async (item) => {
        if (item.nft_name.toLowerCase().includes(query)) {
          filtered_nfts.push(item);
          return item;
        }
      });
      return filtered_nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }

    connectToWallet();
    get_all_collections();
    fetch_artists();
    fetch_all_nfts_from_polybase();
  }, [router.pathname]);

  useEffect(() => {
    if (!defaultCollectionAddress) {
      return;
    }

    async function call() {
      await create_Marketplace_user();

      await create_NFTCollection_default(
        defaultCollectionAddress,
        blockchain,
        chainImg,
        blockURL
      );
    }
    call();
  }, [defaultCollectionAddress]);

  return (
    <PolybaseProvider polybase={polybase}>
      <Navbar
        search_nft={search_nft}
        connectToWallet={connectToWallet}
        signer={signer}
        signer_bal={format_signer_bal}
        signer_address={signer_address}
        connectToIntmax={connectToIntmax}
        chainIdMain={chainIdMain}
        setChainIdMain={setChainIdMain}
        RARX_CHANNEL_ADDRESS={RARX_CHANNEL_ADDRESS}
        chainImg={chainImg}
        blockURL={blockURL}
        symbol={symbol}
        signOut={signOut}
      />
      <Component
        {...pageProps}
        create_token={create_token}
        symbol={symbol}
        create_collection={create_collection}
        all_collections={all_collections}
        signer={signer}
        get_my_collections={get_my_collections}
        signer_address={signer_address}
        rarx_collection={rarx_collection}
        fetch_nfts_from_user_wallet={fetch_nfts_from_user_wallet}
        fetch_NFT_info={fetch_NFT_info}
        polybase={polybase}
        chainIdMain={chainIdMain}
        connectToWallet={connectToWallet}
        setChainIdMain={setChainIdMain}
        xchain_NFT={xchain_NFT}
        x_chain_polygon_address={x_chain_polygon_address}
        x_chain_goerli_address={x_chain_goerli_address}
        fetch_collection_data_from_polybase={
          fetch_collection_data_from_polybase
        }
        fetch_nfts_from_collection={fetch_nfts_from_collection}
        fetch_all_nfts_from_polybase={fetch_all_nfts_from_polybase}
        nfts={nfts}
        list_nft={list_nft}
        stake_nft={stake_nft}
        unstake_nft={unstake_nft}
        available_reward={available_reward}
        claim_reward={claim_reward}
        fetch_listed_nfts={fetch_listed_nfts}
        RARX_CHANNEL_ADDRESS={RARX_CHANNEL_ADDRESS}
        chainImg={chainImg}
        blockURL={blockURL}
        executeSale={executeSale}
        getUserData={getUserData}
        updateData={updateData}
        defaultCollectionAddress={defaultCollectionAddress}
        cancel_listing={cancel_listing}
        artists={artists}
        fetch_collections_polybase={fetch_collections_polybase}
        fetch_nfts_by_chain={fetch_nfts_by_chain}
        deploy_uma={deploy_uma}
        request_verification_UMA={request_verification_UMA}
        uma_settle_request={uma_settle_request}
        txnHashCollection={txnHashCollection}
        marketplace_collection={marketplace_collection}
      />
      <ToastContainer />
      <Footer />
    </PolybaseProvider>
  );
}
