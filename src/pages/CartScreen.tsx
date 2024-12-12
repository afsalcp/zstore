import React, { ReactElement, useEffect, useState } from "react";
import Header1 from "../components/headers/header_1";
import SideBarBigScreen from "../components/side_bar/SideBarBigScreen";
import SideBarSmallScreen from "../components/side_bar/SideBarSmallScreen";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import { CartState, updateCart } from "../redux/slicers/cartSlice";
import axios from "../request";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/slicers/alertSlicer";
import "../css/cart.css";
import { checkAuth } from "../settings/basic";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "./ProductPage";
import LoadingSquare from "../components/LoadingSquare";
import $ from "jquery";

type CartItemState = {
  image: string;
  discount: number;
  orgPrice: number;
  price: number;
  qty: number;
  isVisibleSm: boolean;
  id: string;
};

export default function CartScreen(): ReactElement {
  const cart: CartState = useSelector((state: StoreType) => state.cart);
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const [cartItems, setCartItem] = useState<CartItemState[] | null>(null);
  const [deliveryType, setDeliveryType] = useState<number>(0)


  useEffect(() => {
    if (Object.keys(cart).length) return;

    axios.get("/cart/get-data").then(async (res: AxiosResponse) => {
      if (!res.data.sts) {
        let auth = await checkAuth();
        if (!auth) navigator("/");
        dispatch(showAlert({ msg: res.data.msg }));
        return;
      }

      dispatch(updateCart(res.data.cart));
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!Object.keys(cart).length) return;

      let prods: string[] = Object.keys(cart);

      let prodsData: CartItemState[] = [];

      type Response = {
        sts: boolean;
        product: Product;
      };

      for (let prod of prods) {
        try {
          let { data: res }: AxiosResponse<Response> = await axios.get(
            "/get-product?product_id=" + prod
          );

          let prodData: CartItemState = {
            id: prod,
            isVisibleSm: false,
            image: res.product.thumbnail,
            price: res.product.price,
            qty: cart[prod],
            orgPrice: Number(
              Math.round(
                res.product.price / (1 - res.product.discountPercentage / 100)
              ).toFixed(2)
            ),
            discount:
              Number(
                Math.round(
                  res.product.price / (1 - res.product.discountPercentage / 100)
                ).toFixed(2)
              ) - res.product.price,
          };

          prodsData.push(prodData);
        } catch (error) {
          dispatch(showAlert({ msg: "something went wrong..." }));
          return;
        }

        setCartItem(prodsData);
      }

      console.log(prodsData);
    })();
  }, [cart]);

  useEffect(()=>{
    $('.cart_delivery_type button').on('click',(e)=>{
      alert(e.key)
    })

    return ()=>{$('.cart_delivery_type button').off('click')}
  },[])

  return (
    <div>
      <Header1 />

      <div
        style={{
          padding: 20,
        }}
      >
        <h1
          style={{
            fontSize: 23,
          }}
        >
          Items in your cart
        </h1>

        {cartItems === null ? (
          <LoadingSquare height={"80vh"} width={"100%"} />
        ) : !cartItems.length ? (
          <span>There is item left in your cart</span>
        ) : (
          cartItems.map((item, i) => {
            return (
              <div className="cart_card mt_2">
                <div onClick={() => navigator("/product/" + item.id)}>
                  <img src={item.image} alt="" />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40% 5% 55%",
                      placeContent: "center",
                      rowGap: 10,
                      columnGap: 5,
                    }}
                  >
                    <span>$</span>
                    <span>:</span>
                    <span>${item.price}</span>
                    <span>Qty</span>
                    <span>:</span>
                    <span>{item.qty}</span>
                  </div>
                </div>
                <div style={{ maxWidth: 400, width: "100%" }}>
                  {window.innerWidth > 600 ? (
                    <div
                      onClick={() => navigator("/product/" + item.id)}
                      style={{
                        display: "grid",

                        width: "100%",
                        height: "100%",

                        gridTemplateColumns: "48% 2% 50%",

                        justifyContent: "center",

                        columnGap: 10,
                        rowGap: 20,

                        marginLeft: 30,
                        placeContent: "center",
                      }}
                    >
                      <span className="card_semi_head">Original Price</span>:
                      <span>$3000</span>
                      <span className="card_semi_head">Discount</span>:
                      <span>$100</span>
                      <span className="card_semi_head">Price</span>:
                      <span>$1000</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "90%",
                      }}
                    >
                      <div
                        key={i}
                        style={{
                          transition: "500ms",

                          display: item.isVisibleSm ? "grid" : "none",

                          width: "100%",
                          gridTemplateColumns: "48% 2% 48%",

                          justifyContent: "center",

                          columnGap: 10,
                          rowGap: 20,

                          marginLeft: 30,
                          placeContent: "center",
                        }}
                      >
                        <span className="card_semi_head">Original Price</span>:
                        <span>$3000</span>
                        <span className="card_semi_head">Discount</span>:
                        <span>$100</span>
                        <span className="card_semi_head">Price</span>:
                        <span>$1000</span>
                      </div>
                      <div
                        className="center mt_1"
                        style={{
                          width: "100%",
                          height: 30,

                          border: "dashed 1px grey",

                          borderRadius: 5,

                          display: "flex",
                        }}
                        onClick={() => {
                          setCartItem(
                            cartItems.map((it) => {
                              if (item.id === it.id)
                                it.isVisibleSm = !it.isVisibleSm;
                              return it;
                            })
                          );
                        }}
                      >
                        <i
                          className={
                            item.isVisibleSm
                              ? "fa-solid fa-angle-up"
                              : "fa-solid fa-angle-down"
                          }
                        ></i>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <hr />
        {cartItems?.length && (
          <div className="column mt_5" style={{ width: "100%", maxWidth: 400 }}>
            <div
              style={{ width: "100%", gap: 10 }}
              className="row center_x cart_delivery_type"
            >
              <button className="selected">Standard</button>
              <button>Express</button>
              <button>Pickup</button>
            </div>
            <div
              className="row mt_2"
              style={{
                width: "100%",
                justifyContent: "space-around",
                maxWidth: 400,
                paddingBlock: 10,

                borderBottom:'solid 1px grey'
              }}
            >
              <span>Price</span>
              <span>100</span>
            </div>
            <div
              className="row"
              style={{
                width: "100%",
                justifyContent: "space-around",
                maxWidth: 400,
                paddingBlock: 10,
                borderBottom:'solid 1px grey'
              }}
            >
              <span>Price</span>
              <span>100</span>
            </div>

            <div
              className="row"
              style={{
                width: "100%",
                justifyContent: "space-around",
                maxWidth: 400,
                paddingBlock: 10,
              }}
            >
              <span>Price</span>
              <span>100</span>
            </div>
          </div>
        )}
      </div>
      <div style={{ height: 200 }}></div>

      {window.innerWidth > window.innerHeight ? (
        <SideBarBigScreen index={1} />
      ) : (
        <SideBarSmallScreen index={1} />
      )}
    </div>
  );
}
