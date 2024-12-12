import { ReactElement, useEffect, useState } from "react";
import Header1 from "../components/headers/header_1";
import InputThemed from "../components/InputThemed";
import $ from "jquery"
import axios from "../request";
import Cookie from 'js-cookie'
import {AxiosResponse} from 'axios'
import { showAlert } from "../redux/slicers/alertSlicer";
import { useDispatch } from "react-redux";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import { UserData } from "../redux/slicers/userSlicer";
import { checkAuth } from "../settings/basic";


type ErrorLabel={
    email?:boolean|string,
    pass?:boolean|string
}

export default function LoginPage():ReactElement{

    const [errorLabel,setErrorLabel]=useState<ErrorLabel>({
        email:false,
        pass:false
    })

    const dispatch=useDispatch()
    const navigator=useNavigate()
    
    const location=useLocation()

    const {redirect}:{redirect:string|undefined}=location.state||{}

    useEffect(()=>{
        
        checkAuth().then(auth=>{
            if(auth) return navigator("/")
        })

    },[])
    

    return <div className="login_page">
        <Header1/>
        <div style={{
            display:"flex",
            position:"fixed",

            top:"0",
            bottom:"0",
            left:"0",
            right:"0",

            justifyContent:"center",
            alignItems:"center"
        }}>
            <div style={{
                display:"flex",
                flexDirection:"column",

                justifyContent:"center",
                alignItems:"center",
                gap:5
            }}>
                <h1>Welcome Back...</h1>
                <span>Fill your details</span>
                <div style={{height:50}}></div>
                <InputThemed label="Enter your email or phone number" name="email" placeholder="email/phone number" errorLabel={errorLabel.email} width={'95%'} minWidth="300px"/>
                <InputThemed label="Enter your password" name="pass" placeholder="password"  errorLabel={errorLabel.pass} type="password" width={'95%'} maxWidth="350px" minWidth="300px"/>

                <button style={{
                    paddingInline:40,
                    height:40,
                    backgroundImage:"linear-gradient(to bottom right,var(--theme_main),var(--theme_sub))",
                    border:"none",
                    borderRadius:"5px",
                    marginTop:10,

                    color:"white"
                }} onClick={()=>{
                    let email:string=$("input[name='email']").val() as string
                    let password=$("input[name='pass']").val() as string
                    let isPhone:boolean=/^(\d){10}$/.test(email);

                    if(!isPhone&&!/^(.+)@(.+)\.(.+)/.test(email))return setErrorLabel({email:"phone number or email is not valid"})
                    
                    if((!/\d/.test(password))||(!/[a-zA-Z]/.test(password))||(!/^[a-zA-Z0-9@#$%^&*!~]{8,20}$/.test(password)))return setErrorLabel({pass:"Password must contain 8 letters and contain a-z 0-9 and special symbol"})
                    
                    setErrorLabel({});
                    type Response={
                        error:boolean,
                        msg:string,
                    }
                    type Body={phone?:string,email?:string,password:string}
                    axios.post('/login',{...(isPhone?{phone:email}:{email:email}),password},{withCredentials:true,}).then((res:AxiosResponse<Response>)=>{
                        console.log(res.data)
                        if(res.data.error){
                            return dispatch(showAlert({msg:res.data.msg,hide:5000}))
                        }

                        navigator('/')



                    })  
                }}>Login</button>
            </div>
        </div>
        <div style={{
            position:"fixed",

            bottom:0,
            height:100,
            width:"100%",

            background:"#0B0B0D17",
            
            display:"flex",
            justifyContent:"right",
        
            alignItems:"center"

        }}>
            <button style={{
                height:40,
                marginRight:50,

                background:"#D53E45FF",
                border:"none",

                color:"white",

                borderRadius:10,
                
                padding:10

            }}
            onClick={()=>navigator("/signup")}
            >Don't have an account</button>
        </div>
    </div>
}