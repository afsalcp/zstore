import { ReactElement, useCallback, useEffect, useState } from "react";
import Header1 from "../components/headers/header_1";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import { UserData } from "../redux/slicers/userSlicer";
import { useNavigate } from "react-router-dom";
import axios from "../request";
import { AxiosResponse } from "axios";
import LoadingSquare from "../components/LoadingSquare";
import VerticalCards from "../components/VerticalCards";
import { showAlert } from "../redux/slicers/alertSlicer";
import { useDispatch } from "react-redux";
import {
  setTrendingProduct,
  TrendingState,
} from "../redux/slicers/trendingSlice";
import SearchSection from "../components/headers/search_section";
import SideBarBigScreen from "../components/side_bar/SideBarBigScreen";
import SideBarSmallScreen from "../components/side_bar/SideBarSmallScreen";

interface TrendingProduct {
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  id: string | number;
  url: string;
  state: object;
}

type TrendingProducts = {
  [key: string]: TrendingProduct[];
};

export default function HomePage(): ReactElement {
  const user: UserData = useSelector((state: StoreType) => state.user);
  const trendingProduct: TrendingState = useSelector(
    (state: StoreType) => state.trendingProduct
  );
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user, "here is user");
    if (!user.loaded) {
      navigator("/");
      return;
    }
    console.log("after user", trendingProduct.productKeys);
    if (trendingProduct.productKeys?.length) return;
    type Response = {
      msg?: string;
      sts: boolean;
      products?: TrendingProducts;
    };
    axios.get("/trending-items").then((res: AxiosResponse<Response>) => {
      if (!res.data.sts) {
        dispatch(showAlert({ msg: res.data.msg }));
        // alert('here is the problome')
        setTimeout(
          () => navigator("/", { state: { redirect: "/home" } }),
          1000
        );
        return;
      }
      let keys = Object.keys(res.data.products!).sort(
        () => 0.5 - Math.random()
      );
      keys.forEach((e) => {
        res.data.products![e] = res.data.products![e].map((prod) => {
          prod.url = "/product/" + prod.id;
          return prod;
        });
      });

      dispatch(
        setTrendingProduct({ products: res.data.products!, productKeys: keys })
      );
    });
  }, []);

  return (
    <div>
      <Header1 />

      <SearchSection />

      <div style={{ height: 50 }}></div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {trendingProduct.products ? (
          trendingProduct.productKeys!.map((el, i): ReactElement => {
            return (
              <VerticalCards
                key={i}
                cards={trendingProduct.products![el]}
                height={400}
                label={`Trending items in ${el}`}
              />
            );
          })
        ) : (
          <LoadingSquare width={"95%"} height={"70vh"} />
        )}
      </div>

      {window.innerWidth > window.innerHeight ? (
        <SideBarBigScreen />
      ) : (
        <SideBarSmallScreen />
      )}
    </div>
  );
}

export type { TrendingProduct, TrendingProducts };
