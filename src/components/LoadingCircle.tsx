import { ReactElement } from "react";

export default function LoadingCircle({width,height}:{width:number,height:number}):ReactElement{
    return <svg width={width} height={height} style={{
        width,
        height,
           animation:"round_loading_animation 1s linear infinite"
        
    }}>
        <circle cx={width/2} cy={height/2} r={width/2-3} style={{
            fill:"none",
            stroke:"white",
            strokeWidth:"3px",
            strokeDasharray:2*3.14*(width/2-3),
            strokeDashoffset:(2*3.14*(width/2-3))*.75,
            strokeLinecap:"round",
        }}></circle>
    </svg>
}