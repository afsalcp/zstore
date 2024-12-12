import React, { ReactElement, useState } from 'react'
import navs from './sideBarItems'
import { useNavigate } from 'react-router-dom'

export default function SideBarSmallScreen({index:curInd}:{index?:number}):ReactElement {
  const [index, setIndex] = useState<number>(curInd||0)

  const navigator=useNavigate()


  return (
    <div style={{
        position:"fixed",

        bottom:0,
        left:0,
        right:0,

        display:"flex",
        flexDirection:"row",

        background:"var(--theme_fade)",

        zIndex:4,

        borderTopLeftRadius:10,
        borderTopRightRadius:10,

        backdropFilter:'blur(2px) ',

        transition:'500ms',

        width:'100vw',

        overflow:'scroll',

        justifyContent:'center'

    }}>
        {
            navs.map((e,i)=>{
                return (
                    <div key={i} className='column center_y scale_animation' style={{paddingInline:10,paddingBlock:15,
                        transition:'500ms',
                        color:"var(--theme_sub)",
                        borderRadius:5,
                        ...(index==i?{background:'var(--theme_sub_fade)',color:"white"}:{})
                    }}
                    onClick={()=>{

                        if(i==index)return
                        setIndex(i)
                        navigator(e.path)
                    }}
                    >
                        <i className={e.icon} style={{}}></i>
                        <span style={{fontSize:14}}>{e.title}</span>
                    </div>
                )
            })
        }
    </div>
  )
}