import { ReactElement, useCallback, useEffect, useState } from "react";
import "../css/loading_square.css"


export default function LoadingSquare({width,height}:{width:string|number,height:string|number}):ReactElement{
    const [loader,setLoader]=useState<string>("")
    useEffect(()=>{
       
        
        let interval=setInterval(() => {
            
            if(loader.length===3) setLoader("")
            else setLoader(loader+".")
        }, 500);

        return ()=>clearInterval(interval)
    },[loader])
    return (
        <div className="loading_square" style={{width,height}}>
            <div className="loader"></div>
            <div style={{
                width:"100%",
                height:"100%",

                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                color:'#626969D1'
            }}>Preparing your contents<span style={{width:50}}>{loader}</span> </div>
        </div>
    )
}