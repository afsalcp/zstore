import React, { ReactElement, useEffect, useState } from "react";
import { Product } from "../pages/ProductPage";

type BaseDesc = {
  brand: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  "availability Status": string;
};

type DimAndWeight = {
  width: string;
  height: string;
  depth: string;
  weight: string;
};

export default function ProductDescription({
  product,
}: {
  product: Product;
}): ReactElement {
  const [baseDesc, setBaseDesc] = useState<BaseDesc | null>(null);
  const [dimAndWeight, setDimAndWeight] = useState<DimAndWeight | null>(null);

  useEffect(() => {
    setBaseDesc({
      brand: product.brand,
      title: product.title,
      category: product.category,
      price: product.price,
      rating: product.rating,
      "availability Status": product.availabilityStatus,
    });

    setDimAndWeight({
      width: `${product.dimensions.width} In`,
      height: `${product.dimensions.height} In`,
      depth: `${product.dimensions.height} In`,
      weight: `${product.weight} Kg`,
    });
  }, []);

  return (
    <div id="product_description" className="column mt_3">
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        Description
      </span>
      <p>{product.description}</p>

      <span style={{ fontWeight: "bold" }}>Basic Details</span>

      <div
        className="row mt_3"
        style={{
          width: "100%",
          flexWrap: "wrap",

          gap: 20,
        }}
      >
        {baseDesc &&
          Object.keys(baseDesc).map((key, i) => {
            return (
              <div className="scale_animation"
                key={i}
                style={{
                  width: "45%",
                  minWidth: 300,
                  maxWidth: "90%",

                  display: "grid",

                  gridTemplateColumns: "40% 60%",

                  border: "solid 1px var(--theme_sub)",
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    background: "var(--theme_sub)",
                    paddingBlock: 10,
                    color: "white",
                    paddingLeft: 20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    textTransform: "capitalize",
                    placeContent: "center",
                  }}
                >
                  {key}
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "var(--theme_sub)",
                    paddingBlock: 10,
                    paddingLeft: 20,
                  }}
                >
                  {baseDesc[key as keyof BaseDesc] || "Unknown"}
                </div>
              </div>
            );
          })}
      </div>

      <span style={{ marginTop: 30, fontWeight: "bold" }}>
        Dimensions and Weight
      </span>
      <div
        className="row mt_3"
        style={{
          width: "100%",
          flexWrap: "wrap",

          gap: 20,
        }}
      >
        {dimAndWeight &&
          Object.keys(dimAndWeight).map((key, i) => {
            return (
              <div key={i}

              className="scale_animation"
                style={{
                  width: "45%",
                  minWidth: 300,
                  maxWidth: "90%",

                  display: "grid",

                  gridTemplateColumns: "40% 60%",

                  border: "solid 1px var(--theme_sub)",
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    background: "var(--theme_sub)",
                    paddingBlock: 10,
                    color: "white",
                    paddingLeft: 20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    textTransform: "capitalize",
                    placeContent: "center",
                  }}
                >
                  {key}
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "var(--theme_sub)",
                    paddingBlock: 10,
                    paddingLeft: 20,
                  }}
                >
                  {dimAndWeight[key as keyof DimAndWeight] || "Unknown"}
                </div>
              </div>
            );
          })}
      </div>
      <div className="row" style={{gap:20, marginTop: 30}}>
        <span style={{ fontWeight: "bold" }}>Return Policy:- </span>
        <span>{product.returnPolicy}</span>
      </div>
      <div className="row" style={{gap:20, marginTop: 30}}>
        <span style={{ fontWeight: "bold" }}>Warranty Information:- </span>
        <span>{product.warrantyInformation}</span>
      </div>
      <div className="row" style={{gap:20, marginTop: 30}}>
        <span style={{ fontWeight: "bold" }}>Shipping Information:- </span>
        <span>{product.shippingInformation}</span>
      </div>
      <div style={{display:"flex",gap:20,marginTop:30   }}>
        {
          product?.tags.map((e,i)=>{
            return <span key={i}>{e} {i==product.tags.length-1?"":">"}</span>
          })
        }
      </div>
    </div>
  );
}
