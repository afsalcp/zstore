import { ReactElement } from "react";
import { UserData } from "../../redux/slicers/userSlicer";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/store";

export default function SearchSection(): ReactElement {


    const user:UserData=useSelector((state:StoreType)=>state.user)



  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",

        width: "100%",

        background: "#80808055",
        alignItems: "center",

        paddingBlock: 10,

        position:'sticky',

        top:0,

        zIndex:4,

        backdropFilter:"blur(8px)"

        
      }}
    >
      <div
        style={{
          minWidth: 300,
          maxWidth: "100%",

          display: "flex",
          justifyContent: "space-around",
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#432E7AFF",
          }}
        >
          {user.fname}
        </span>
        <span>{user.city}</span>
      </div>
      <div
        style={{
          minWidth: 300,
          maxWidth: "100vw",

          display: "flex",

          justifyContent: "center",

          gap: "20px",
          flex: 1,

          
        }}
      >
        <input
          type="text"
          style={{
            outline: "none",
            minWidth: 200,
            maxWidth: 400,
            background: "var(--theme_fade)",

            border: "solid .5px grey",

            borderRadius: 10,
            paddingInline: 10,
          }}
          placeholder="Search your query here..."
        />
        <button
          className="scale_animation"
          style={{
            height: 40,

            width: "15%",
            maxWidth: 60,

            background: "var(--theme_fade)",
            border: "none",

            borderRadius: 8,

            color: "black",

            fontWeight: "bold",
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
}
