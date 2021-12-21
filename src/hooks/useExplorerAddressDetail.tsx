/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Transaction from "../utils/explorer-types";
import { explorerInstance } from "../axios/axios";
import {
  explorerGetAddressRecentTxsList,
  getAddressOverview,
  getAddressNativeInfo,
  getAddressTokens,
  explorerGetOverviewData,
} from "../axios/requests";
import { AccountsApi, Configuration } from "@stacks/blockchain-api-client";

export interface ExplorerOverview {
  total_sent: number;
  total_received: number;
  total_fee: number;
  total_mining_rewards: number;
  total_balance: number;
}

export const STACK_API_URL = "https://stacks-node-api.mainnet.stacks.co";
export const config = new Configuration({ basePath: STACK_API_URL });
export const accountsApi = new AccountsApi(config);

export const NFTS: {
  asset_identifier: string;
  img: string;
  assetName: string;
  assetType: string;
}[] = [
  {
    assetName: "Bitcoin monkey",
    asset_identifier:
      "SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.bitcoin-monkeys::bitcoin-monkeys",
    img: "https://ipfs.io/ipfs/QmYCnfeseno5cLpC75rmy6LQhsNYQCJabiuwqNUXMaA3Fo/",
    assetType: ".png",
  },
  {
    assetName: "Bubo",
    asset_identifier: "SP3N81TKV43PN24NPHNNM8BBNQJ51Q31HE9G0GC46.bubo::bubo",
    img: "https://ipfs.io/ipfs/QmdCtFNfFu8RnewyUNayiDuAUQAN6jarYE18c3NTKNhSYF/",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SP1T4Y4WK9DGZ2EDWSNHRE5HRRBPVG7S46JAHW552.panda-nft::Panda",
    img: "https://ipfs.io/ipfs/Qmd73GqEbLEjNMCQZXhJg1i919ZRUJNyRuxDbLAPG9uG14/",
    assetName: "Panda",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-pops::stacks-pops",
    img: "https://ipfs.io/ipfs/Qmd73GqEbLEjNMCQZXhJg1i919ZRUJNyRuxDbLAPG9uG14/",
    assetName: "Stacks Pops",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v3::stacks-punks",
    img: "https://www.stackspunks.com/assets/punks/punk",
    assetName: "Stacks Punks",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.free-punks-v0::free-punks",
    img: "https://www.stackspunks.com/assets/punks/punk",
    assetName: "Free Punks",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SP1T4Y4WK9DGZ2EDWSNHRE5HRRBPVG7S46JAHW552.panda-nft::Panda",
    img: "https://ipfs.io/ipfs/Qmd73GqEbLEjNMCQZXhJg1i919ZRUJNyRuxDbLAPG9uG14/",
    assetName: "Panda",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SP1T4Y4WK9DGZ2EDWSNHRE5HRRBPVG7S46JAHW552.panda-nft::Panda",
    img: "https://ipfs.io/ipfs/Qmd73GqEbLEjNMCQZXhJg1i919ZRUJNyRuxDbLAPG9uG14/",
    assetName: "Panda",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.byte-fighters::byte-fighters",
    img: "https://stacksart.s3.amazonaws.com/byte-fighters/",
    assetName: "Panda",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stx-youth::stx-youth",
    img: "https://stacksart.s3.amazonaws.com/stx-youth/Youth",
    assetName: "Panda",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-giantpandas::stacks-giantpandas",
    img: "https://ipfs.io/ipfs/QmbfNSJQ1zEzyCnXN2mP4tcS5w6QpWmtW72xg4EpK2g6bR/",
    assetName: "Panda",
    assetType: ".png",
  },
  {
    asset_identifier:
      "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.citadels::citadels",
    img: "https://stacksart.s3.amazonaws.com/citadels/Mansion",
    assetName: "Citadel",
    assetType: ".png",
  },
];
export interface AddressNativeInfo {
  assets_info: {
    balance: number;
    fungible_tokens: {
      name: string;
      contract_name: string;
      balance: number;
    }[];
    non_fungible_tokens: {
      name: string;
      contract_name: string;
      count: number;
    }[];
  };
  stacking_info: {
    stacking_amount: number;
    burnchain_lock_at: number;
    burnchain_unlock_at: number;
    percents: number;
  };
  mining_info: {
    miner_rewards: number;
    total_burnt: number;
  };
}

export interface TokensList {
  name: string;
  contract_name: string;
  balance: number;
}

export interface AddressNFTs {
  url: string;
  id: string;
  assetName: string;
}

export const useExplorerAddressDetails = () => {
  const [address, setAddress] = useState("");
  const [overviewData, setOverviewData] = useState<ExplorerOverview>({
    total_sent: 0,
    total_received: 0,
    total_fee: 0,
    total_mining_rewards: 0,
    total_balance: 0,
  });
  const [nativeInfo, setNativeInfo] = useState<AddressNativeInfo>();
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [tokens, setTokens] = useState<TokensList[]>([]);
  const [nfts, setNfts] = useState<AddressNFTs[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasNextPage, sethasNextPage] = useState(true);
  const [blockHeight, setBlockHeight] = useState(0);
  const [username, setUsername] = useState("");

  const getRecentTransactions = () => {
    setIsLoading(true);
    try {
      explorerInstance
        .get(
          explorerGetAddressRecentTxsList(
            address,
            10,
            recentTransactions.length
          )
        )
        .then((data: any) => {
          sethasNextPage(data.confirmedTxs.results.length === 10);
          const transactions = recentTransactions.concat(
            data.confirmedTxs.results
          );
          setRecentTransactions(transactions);
          setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const getName = async () => {
    const result = await fetch(
      `https://stacks-node-api.mainnet.stacks.co/v1/addresses/stacks/${address}`
    );
    const resData = await result.json();
    if (resData && resData.names.length > 0) {
      setUsername(resData.names[0]);
    }
  };

  const getOverviewData = () => {
    explorerInstance.get(explorerGetOverviewData).then((data: any) => {
      setBlockHeight(data.BTC_height);
    });
    explorerInstance.get(getAddressOverview(address)).then((data: any) => {
      setOverviewData(data);
    });
  };

  const getNativeInfo = () => {
    explorerInstance.get(getAddressNativeInfo(address)).then((data: any) => {
      setNativeInfo(data);
    });
  };

  const getAddressNFTs = async () => {
    const data = await accountsApi.getAccountNft({
      principal: address,
    });
    console.log(data);
    const currentNfts = data.nft_events.map((nft) => {
      const asset = NFTS.find(
        (x) => x.asset_identifier === nft.asset_identifier
      );
      return {
        url: asset?.img + nft.value.repr.substr(1) + ".png",
        assetName: asset?.assetName || "",
        id: nft.value.repr.substr(1),
      };
    });
    setNfts(currentNfts);
  };

  const getAddressTokensList = () => {
    explorerInstance.get(getAddressTokens(address, 10, 0)).then((data: any) => {
      setTokens(
        data.results
          .sort((a: any, b: any) => {
            return b.balance - a.balance;
          })
          .map((item: any) => {
            return {
              name: item.name.substr(1),
              balance: item.balance.toLocaleString(),
            };
          })
      );
    });
  };

  useEffect(() => {
    if (address) {
      getOverviewData();
      getName();
      getAddressTokensList();
      getRecentTransactions();
      getNativeInfo();
      getAddressNFTs();
    }
  }, [address]);

  return {
    getRecentTransactions,
    recentTransactions,
    overviewData,
    hasError,
    nativeInfo,
    isLoading,
    setAddress,
    hasNextPage,
    nfts,
    blockHeight,
    address,
    tokens,
    username,
  };
};
