import Image from "next/image";
import React from "react";
import Head from "next/head";

//team
import shravanImage from "../../public/shravan.jpeg";
import aniruddhaImage from "../../public/aniruddha.jpg";

//chains
import filecoin from "../../public/chains/filecoin.png";
import gnosis from "../../public/chains/gnosis.png";
import mantle from "../../public/chains/mantle.png";
import polygon from "../../public/chains/polygon.png";
import scroll from "../../public/chains/scroll.png";
import taiko from "../../public/chains/taiko.png";
import goerli from "../../public/chains/goerli.png";

//tech
import connext from "../../public/tech/connext.png";
import intmax from "../../public/tech/intmax.jpeg";
import polybase from "../../public/tech/polybase.jpeg";
import push from "../../public/tech/push.jpeg";
import superfluid from "../../public/tech/superfluid.png";
import thegraph from "../../public/tech/thegraph.jpeg";
import uma from "../../public/tech/uma.jpeg";
import ipfsLogo from "../../public/tech/ipfs.png";
import infuraIPFS from "../../public/tech/infura.png";
import moralisIMG from "../../public/tech/moralis.webp";

const About = () => {
  return (
    <>
      <Head>
        <title>About - ShibLite Marketplace</title>
        <meta name="description" content="About rarx marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* <!-- title --> */}
      <section className="relative pt-24">
        <div className="container">
          <div className="mx-auto max-w-2xl py-16 text-center">
            <h1 className="mb-8 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              About ShibLite
            </h1>
            <p className="text-lg leading-normal dark:text-jacarta-300">
              Rarx is a multi-chain and cross-chain advanced NFT marketplace
              with features like AI NFT Generation, Cross-chain NFTs, On-chain
              Collections, Realtime Notifications, Chat with artists, Membership
              subscriptions for artists, etc. Build By A Team Of 2 Passionate
              Developers During Scaling Ethereum 2023 Hackathon Organised by
              Ethglobal. Below is the introduction video of ShibLite
              Marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- YouTube Modal --> */}
      <div
        className=" fade video-lightbox js-video-lightbox"
        tabindex="-1"
        aria-label="Youtube Modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="ratio ratio-16x9 before:bg-jacarta-900">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/hJsEJF-TrtM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Team --> */}
      <section className="py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            Team Behind ShibLite
          </h2>
          <div className="flex flex-wrap justify-center align-middle">
            <div className="rounded-2lg border border-jacarta-100 bg-white p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700 m-4 w-[270px]">
              <Image
                src={shravanImage}
                className="mx-auto mb-6 h-[220px] w-[300px] rounded-2.5xl"
                alt="team"
                height={100}
                width={100}
              />
              <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                Shravan Andoria
              </h3>
              <span className="text-2xs font-medium tracking-tight text-jacarta-400">
                Full Stack Developer
              </span>

              <div className="mt-3 flex justify-center space-x-5">
                <a
                  href="https://www.linkedin.com/in/shravan-andoria-728290170/?originalSubdomain=in"
                  target="_blank"
                  className="group"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="linkedin"
                    className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/AndoriaShravan"
                  target="_blank"
                  className="group"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="rounded-2lg border border-jacarta-100 bg-white p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700 m-4 w-[270px]">
              <Image
                src={aniruddhaImage}
                className="mx-auto mb-6  h-[200px] w-[auto] m-4 shadow-xl  rounded-2.5xl"
                alt="team"
                height={100}
                width={100}
              />
              <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                Aniruddha Vikharankar
              </h3>
              <span className="text-2xs font-medium tracking-tight text-jacarta-400">
                Full Stack Developer
              </span>

              <div className="mt-3 flex justify-center space-x-5">
                <a
                  href="https://www.linkedin.com/in/aniruddha-vikharankar-374296208/"
                  target="_blank"
                  className="group"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="linkedin"
                    className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/Aniruddha2000"
                  target="_blank"
                  className="group"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- chains --> */}
      <div className="container">
        <h2 className="mb-8 mt-8 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          Supported Chains
        </h2>
        <div className="grid grid-cols-2 py-8 sm:grid-cols-5 text-center">
          <a
            href="https://fvm.filecoin.io/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={filecoin}
              alt="filecoin"
              className="h-[150px] w-[auto] m-4"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Filecoin
            </h3>
          </a>
          <a
            href="https://gnosischain.com"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={gnosis}
              alt="gnosis"
              className="h-[150px] w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Gnosis
            </h3>
          </a>
          <a
            href="https://mantle.xyz"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={mantle}
              alt="mantle"
              className="h-[150px] w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Mantle
            </h3>
          </a>
          <a
            href="https://polygon.technology/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={polygon}
              alt="polygon"
              className="h-[150px] w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Polygon
            </h3>
          </a>
          <a
            href="https://scroll.io/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={scroll}
              alt="scroll"
              className="h-[150px]  w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Scroll
            </h3>
          </a>
          <a
            href="https://taiko.xyz/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={taiko}
              alt="taiko"
              className="h-[150px] w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Taiko
            </h3>
          </a>
          <a href="#" className="flex flex-col justify-center">
            <Image
              src={goerli}
              alt="goerli"
              className="h-[120px] w-[120px] m-6 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Ethereum
            </h3>
          </a>
        </div>
      </div>

      {/* <!-- tech --> */}
      <div className="container">
        <h2 className="mb-6 mt-16 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          Integrated Technologies
        </h2>
        <div className="grid grid-cols-2 py-8 sm:grid-cols-5 text-center">
          <a
            href="https://www.connext.network/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={connext}
              alt="connext"
              className="h-[150px] w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Connext
            </h3>
          </a>
          <a
            href="https://intmaxwallet.io/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={intmax}
              alt="intmax"
              className="h-[150px] w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              IntMax
            </h3>
          </a>
          <a
            href="https://polybase.xyz/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={polybase}
              alt="polybase"
              className="h-[150px]  w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Polybase
            </h3>
          </a>
          <a
            href="https://push.org/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={push}
              alt="push"
              className="h-[150px]  w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Push Protocol
            </h3>
          </a>
          <a
            href="https://www.superfluid.finance/"
            target="_blank"
            className="flex flex-col justify-center"
          >
            <Image
              src={superfluid}
              alt="superfluid"
              className="h-[150px] w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Superfluid
            </h3>
          </a>
          {/* <a href="https://thegraph.com/" target="_blank" className="flex flex-col justify-center">
            <Image
              src={thegraph}
              alt="thegraph"
              className="h-[150px]  w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              The Graph
            </h3>
          </a> */}
          <a
            href="https://uma.xyz/"
            target="_blank"
            className="flex flex-col justify-center mt-4"
          >
            <Image
              src={uma}
              alt="uma"
              className="h-[150px]  w-[150px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              UMA
            </h3>
          </a>
          <a
            href="https://www.infura.io/"
            target="_blank"
            className="flex flex-col justify-center mt-4"
          >
            <Image
              src={infuraIPFS}
              alt="ipfs"
              className="h-[140px] w-[140px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Infura IPFS
            </h3>
          </a>
          <a
            href="https://moralis.io/"
            target="_blank"
            className="flex flex-col justify-center mt-4"
          >
            <Image
              src={moralisIMG}
              alt="ipfs"
              className="h-[140px] w-[140px] m-4 self-center"
              height={100}
              width={100}
            />
            <h3 className="font-display text-md text-jacarta-700 dark:text-white">
              Moralis
            </h3>
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
