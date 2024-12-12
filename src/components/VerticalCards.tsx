import { ReactElement } from "react";
import { TrendingProduct as CardsType } from "../pages/HomePage";
import { Link } from "react-router-dom";

export default function VerticalCards({
  height = 350,
  label,
  cards,
}: {
  height?: number;
  label?: string;
  cards: CardsType[];
}): ReactElement {
  const prod = cards[0];
  console.log(prod);

  return (
    <div
      style={{
        width: "95%",
        height,

        display: "flex",

        flexDirection: "column",
      }}
    >
      {label && (
        <span
          style={{
            fontSize: 22,
            fontWeight: 1000,
            color: "var(--theme_sub)",
            height: height * 0.14,
            textTransform: "capitalize",
          }}
        >
          {label}
        </span>
      )}
      <div
        style={{
          width: "100%",
          height: height * (1 - 0.14),

          display: "flex",

          overflow: "scroll",

          gap: 20,
        }}
      >
        {cards.map((prod, i): ReactElement => {
          return (
            <Link
              key={i}
              to={prod.url}
              style={{ textDecoration: "none", color: "black", minWidth: height * 0.34,
                maxWidth: height * 0.34,border: "solid .5px black",
                borderRadius: 10,

                padding: 10,}}

                state={prod.state}
            >
              <div
                style={{

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  width:"100%",
                  height:"100%"
                  
                }}
              >
                <div
                  style={{
                    width: "100%",
                    minHeight: height * 0.5,
                    maxHeight: height * 0.7,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    borderBottom: "solid 1px black",
                  }}
                >
                  <img
                    src={prod.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",

                    // background:"linear-gradient(to right bottom,#CD20A488,var(--theme_sub_fade) 10%,#CD20A488)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <span
                      style={{
                        textTransform: "capitalize",

                        fontWeight: "bold",
                      }}
                    >
                      {prod.title}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      color: "var(--theme_sub)",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    ${prod.price}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
