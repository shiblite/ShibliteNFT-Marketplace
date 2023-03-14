import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import testNFT from "../../../../public/test.jpg";
import Image from "next/image";
import NftCard from "@/components/cards/NftCard";

const Collection = ({
  get_collection_by_id,
  fetch_nfts_from_user_wallet,
  signer,
  signer_address,
}) => {
  const router = useRouter();
  const { id, slug } = router.query;
  console.log(slug);

  const [share, setShare] = useState(false);
  const [collection, set_collection] = useState({});
  const [nfts, set_nfts] = useState([]);

  const get_collection = async () => {
    if (!signer) return;
    const collection = await get_collection_by_id(id, signer);
    set_collection(collection);
  };

  const get_nfts = async () => {
    if (!signer && !signer_address) return;
    console.log({ signer_address });
    const nfts = await fetch_nfts_from_user_wallet(slug, signer_address);
    console.log({ nfts });
    set_nfts(nfts);
  };

  useEffect(() => {
    get_collection();
    get_nfts();
  }, [signer, signer_address]);
  return (
    <>
      {/* <!-- Banner IMG--> */}
      <div className="relative mt-24">
        <Image
          src={collection.image?.replace("ipfs://", "https://ipfs.io/ipfs/")}
          width={100}
          height={100}
          alt="banner"
          className="h-[18.75rem] w-[100%] object-cover"
        />
      </div>

      {/* <!-- Collection Section --> */}
      <section className="relative bg-light-base pb-12 pt-28 dark:bg-jacarta-800">
        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <figure className="relative">
            <Image
              src={collection.logo?.replace("ipfs://", "https://ipfs.io/ipfs/")}
              width={100}
              height={100}
              alt="collection avatar"
              className="rounded-xl border-[5px] border-white dark:border-jacarta-600 h-[130px] w-[auto]"
            />
            <div
              className="absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
              data-tippy-content="Verified Collection"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-[.875rem] w-[.875rem] fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
              </svg>
            </div>
          </figure>
        </div>

        <div className="container">
          <div className="text-center">
            <h2 className="mb-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              {collection.name}
            </h2>
            <div className="mb-8 inline-flex items-center justify-center rounded-full border border-jacarta-100 bg-white py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
              <button className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200">
                <span>{slug}</span>
              </button>
            </div>
            <div className="mb-8">
              <span className="text-sm font-bold text-jacarta-400">
                Created by{" "}
              </span>
              <a href="user.html" className="text-sm font-bold text-accent">
                {collection.owner}
              </a>
            </div>

            <div className="mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border border-jacarta-100 bg-white dark:border-jacarta-600 dark:bg-jacarta-800">
              <a
                href="#"
                className="w-1/2 rounded-l-xl border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
              >
                <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                  7.2K
                </div>
                <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                  Items
                </div>
              </a>
              <a
                href="#"
                className="w-1/2 border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32 sm:border-r"
              >
                <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                  5.3K
                </div>
                <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                  Owners
                </div>
              </a>
              <a
                href="#"
                className="w-1/2 border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
              >
                <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                  <span className="font-bold">2.55</span>
                </div>
                <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                  Floor Price
                </div>
              </a>
              <a
                href="#"
                className="w-1/2 rounded-r-xl border-jacarta-100 py-4 hover:shadow-md sm:w-32"
              >
                <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                  <span className="font-bold">17.2K</span>
                </div>
                <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                  Volume Traded
                </div>
              </a>
            </div>

            <p className="mx-auto mb-2 max-w-xl text-lg dark:text-jacarta-300">
              {collection.description}
            </p>

            <div className="mt-6 flex items-center justify-center space-x-2.5">
              {/* love  */}
              <div className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                <div
                  className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm before:absolute before:h-4 before:w-4 before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                  role="button"
                  data-tippy-content="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                  </svg>
                </div>
              </div>
              {/* Share  */}
              <div
                onClick={() => setShare(!share)}
                className="dropdown rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600"
              >
                <a
                  href="#"
                  className="dropdown-toggle inline-flex h-10 w-10 items-center justify-center text-sm"
                  role="button"
                  id="collectionShare"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-tippy-content="Share"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.458l5.11 2.787a3.5 3.5 0 1 1-.958 1.755z" />
                  </svg>
                </a>

                {share && (
                  <div className="dropdown-menu dropdown-menu-end z-10 min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800">
                    <a
                      href="https://twitter.com/home"
                      target="_blank"
                      className="flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="twitter"
                        className="mr-2 h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                      </svg>
                      <span className="mt-1 inline-block text-black">
                        Twitter
                      </span>
                    </a>
                    <a
                      href="https://gmail.com"
                      target="_blank"
                      className="flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-2 h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z" />
                      </svg>
                      <span className="mt-1 inline-block text-black">
                        Email
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-2 h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" />
                      </svg>
                      <span className="mt-1 inline-block text-black">Copy</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* nft section  */}
      <section className="relative py-24 pt-20">
        <div className="container">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="on-sale"
              role="tabpanel"
              aria-labelledby="on-sale-tab"
            >
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                {/* loop the below div its a nft div*/}
                <NftCard
                  ImageSrc={testNFT}
                  Name="NFT #1"
                  Description="NFT Description"
                  Address="0x7899"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;