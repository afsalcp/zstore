import { ReactElement } from "react";

export default function Header1():ReactElement{
    return <div style={{
        width:"100vw",
        height:"15vh",
        backgroundImage:"linear-gradient(to bottom right,var(--theme_main),var(--theme_sub))",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        boxShadow:"1px 0 5px 1px #A26425B0",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}>
        <h1 style={{fontFamily:'header',color:"var(--theme_text)"}}>ZStore</h1>
    </div>
}