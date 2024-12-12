import { ReactElement, useCallback, useEffect } from "react";
import "../css/splash_page.css"
import LoadingCircle from "../components/LoadingCircle";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { sleep } from "../settings/basic";
import axios from "../request";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setUser, UserData } from "../redux/slicers/userSlicer";




export default function SplashPage():ReactElement{

    const navigate:NavigateFunction=useNavigate()
    const dispatch=useDispatch()

    const location=useLocation()

    const {redirect,sign}:{redirect:string|undefined,sign:string|undefined}=location.state||{}
    useEffect(()=>{
        
        // var user:any=localStorage.getItem("user")
        // user=user?user:"{}"
        // user=JSON.parse(user) as object;
        
        // let userdata:UserData=user;

        // sleep(1000).then(()=>{
        //     if(userdata.username)return navigate("/home")
        //     navigate('/signup')
        // })

        interface Response extends UserData{
            sts:boolean,
            msg?:string
        }

        (async()=>{
            let res:AxiosResponse<Response>=await axios.get("/getData")
            if(!res.data.sts){
                return navigate('/signup')
            }
            
            dispatch(setUser({user:res.data}))

            
            return navigate(redirect?redirect:"/home")
             
                
                
            
        })()

    

        

        


    },[])

    return <div className="screen">
        <h1 style={{fontFamily:"header",color:"#DBFFEEFF",textShadow:"0 0 5px #484545FF"}}>ZStore</h1>

        <div style={{display:"flex",alignItems:"center",gap:20}}>
            <span style={{
                color:"white",
                fontSize:".8rem",
                letterSpacing:"1.5px",
                textShadow:"0 0 2px #010101FF"
            }}>Please wait, we are loading your content .... </span>
            <LoadingCircle width={30} height={30}/>
        </div>
        
    </div>
}