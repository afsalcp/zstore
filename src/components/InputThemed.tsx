import { ReactElement } from "react";
import "../css/input_theme.css"

export default function InputThemed({errorLabel,label,name,placeholder,width=350,height=35,type='text',minWidth,maxWidth}:{label:string,name:string,placeholder:string,width?:string|number,height?:string|number,type?:string,minWidth?:string,maxWidth?:string,errorLabel?:string|boolean}):ReactElement{
    let randId=Date.now().toString()+name;
    return <div className="input_themed" style={{display:"flex",flexDirection:"column",gap:5,width,maxWidth,minWidth,}}>
        <label htmlFor={randId} style={{
            marginLeft:10,
            fontWeight:"bold"
        }}>{label}</label>
        <input  type={type} placeholder={placeholder} name={name} id={randId} style={{width:"100%",height,border:"solid 1.5px var(--theme_main)",borderRadius:8,backgroundColor:"var(--theme_fade)",color:"black",outline:"none",transition:".8s",fontWeight:"bold"}}/>
        {errorLabel&&<label className="error_label">{errorLabel}</label>}
    </div>
}