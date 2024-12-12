import { ReactElement, useEffect, useState } from "react";
import InputThemed from "../components/InputThemed";
import axios from "../request"

import $ from 'jquery'
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/slicers/alertSlicer";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { checkAuth, sleep } from "../settings/basic";
import Header1 from "../components/headers/header_1";

type Response={
    msg?:string,
    error:boolean,

}


export default function SignupPage():ReactElement{

    const dispatch=useDispatch();

    const [errorLabel,setErrorLabel]=useState({
        'lname':false,
        'fname':false,
        pincode:false,
        building:false,
        area:false,
        city:false,
        state:false,
        phone:false,
        email:false,
        password:false
    })

    const navigator=useNavigate()

    useEffect(()=>{
        
        checkAuth().then(auth=>{
            if(auth) return navigator("/")
        })

    },[])

    return <div>
        <Header1/>

        <div style={{display:"grid",placeItems:"center",marginTop:20,color:"var(--theme_main)"}}>
            <h2 style={{fontFamily:"header"}}>You are Ready to GO...</h2>
            <span style={{marginTop:-30,color:"#7D7676FF",letterSpacing:-1}}>Create an account now</span>
        </div>

        <div style={{
            width:"100vw",  
            display:"flex",
            
            flexWrap:"wrap",
            justifyContent:"center",
            gap:"20px",
            marginTop:40
        }}>
            
            <InputThemed label="First Name" name="fname" placeholder="Enter your first name" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.fname&&"Please enter first name (min:- 4 ltrs, max:- 20 ltrs)"}/> 
            <InputThemed label="Last Name" name="lname" placeholder="Enter your last name" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.lname&&"Please enter last name (min:- 4 ltrs, max:- 20 ltrs)"}/>
            <InputThemed label="Email ID" name="email" type="email" placeholder="egmail@mail.com" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.email&&"please enter email correctly"}/>
            <InputThemed label="Password" name="password" type="password" placeholder="password1234" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.password&&"Password must contain letters and numbers"}/>
            <InputThemed label="Phone Number" name="phone" type="number" placeholder="+91 1234567890" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.phone&&"please enter phone number"}/>
            <InputThemed label="State Name" name="state" type="text" placeholder="Enter your state name" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.state&&"please enter state name (min:- 3 ltrs, max:- 20 ltrs)"}/>
            <InputThemed label="City Name" name="city" type="text" placeholder="Enter your city name" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.city&&"please enter city name (min:- 3 ltrs, max:- 20 ltrs)"}/>
            <InputThemed label="Area Name" name="area" type="text" placeholder="Enter your area name" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.area&&"please enter area name (min:- 3 ltrs, max:- 20 ltrs)"}/>
            <InputThemed label="Building/House Name" name="building" type="text" placeholder="Enter your building/house name" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.building&&"Please enter building house name"}/>
            <InputThemed label="Pincode" name="pincode" type="number" placeholder="Pincode" maxWidth="350px" width={"90%"} minWidth="300px" errorLabel={errorLabel.pincode&&"Please enter your pincode"}/>

            

        </div>
        <div className="row center" style={{marginTop:20}}>
        <button style={{
                padding:10,
                paddingInline:40,
                background:"var(--theme_main)",
                border:"none",
                borderRadius:4,
                color:"white",
                fontWeight:"bold"
            }} onClick={()=>{
                let fname=$('input[name=fname]').val() as string,
                lname=$('input[name=lname]').val() as string,
                email=$('input[name=email]').val() as string,
                phone=$('input[name=phone]').val() as string,
                state=$('input[name=state]').val() as string,
                city=$('input[name=city]').val() as string,
                area=$('input[name=area]').val() as string,
                building=$('input[name=building]').val() as string,
                pincode=$('input[name=pincode]').val() as string,
                password=$('input[name=password]').val() as string
                
                console.log(!/^(.+)@(.+)\.(.+)$/.test(email))
               

                if(!fname||fname.length<4||fname.length>20)return setErrorLabel({...errorLabel,fname:true})
          
                if(lname.length<4||lname.length>20)return setErrorLabel({...errorLabel,lname:true,fname:false})
                if(!/^(.+)@(.+)\.(.+)$/.test(email))return setErrorLabel({...errorLabel,email:true,fname:false,lname:false})
                if((!/\d/.test(password))||(!/[a-zA-Z]/.test(password))||(!/^[a-zA-Z0-9@#$%^&*!~]{8,20}$/.test(password))) return setErrorLabel({...errorLabel,password:true,email:false,fname:false,lname:false})
                if(!/^([0-9]){10}$/.test(phone))return setErrorLabel({...errorLabel,phone:true,email:false,fname:false,lname:false,password:false})
                if(!/^(.+){3,20}$/.test(state))return setErrorLabel({...errorLabel,state:true,email:false,fname:false,lname:false,phone:false,password:false})
                if(!/^(.+){3,20}$/.test(city))return setErrorLabel({...errorLabel,city:true,state:false,email:false,fname:false,lname:false,phone:false,password:false})
                if(!/^(.+){3,20}$/.test(area))return setErrorLabel({...errorLabel,area:true,city:false,state:false,email:false,fname:false,lname:false,phone:false,password:false})
                if(!/^(.+){3,20}$/.test(building))return setErrorLabel({...errorLabel,building:true,area:false,city:false,state:false,email:false,fname:false,lname:false,phone:false,password:false})
                if(!/^(\d){6}$/.test(pincode))return setErrorLabel({...errorLabel,pincode:true,building:false,area:false,city:false,state:false,email:false,fname:false,lname:false,phone:false,password:false})
                
                setErrorLabel({
                    'lname':false,
                    'fname':false,
                    pincode:false,
                    building:false,
                    area:false,
                    city:false,
                    state:false,
                    phone:false,
                    email:false,
                    password:false
                })

                console.log("hey")
                
                axios.post('/create-account',{
                    lname,
                    fname,
                    pincode,
                    building,
                    area,
                    city,
                    state,
                    phone,
                    email,
                    password
                }).then(async(res:AxiosResponse<Response>)=>{
                    if(res.data.error){
                        return dispatch(showAlert({msg:res.data.msg||"Something went wrong",hide:2000}))
                    }
                    dispatch(showAlert({msg:"Account creation successful",hide:2000}))
                    await sleep(2000)

                    navigator("/")
                    console.log(res)
                }).catch(err=>{
                    dispatch(showAlert({msg:"Something went wrong",hide:2000}))
                    console.log(err)
                })
            }}>Create Account</button>
        </div>

        <div style={{height:100}}></div>
        <div style={{
            position:"fixed",
            bottom:0,
            left:0,
            right:0,
            height:80,
            paddingInline:20,
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            backgroundColor:"#00000063"
        }}>
            <button style={{
                paddingInline:10,
                height:40,

                border:"solid 1px white",
                color:"white",
                fontWeight:"bold",
                backgroundColor:"#0000008E",

                borderRadius:4
            }}>Guest Account</button>
            <button style={{
                paddingInline:10,
                height:40,

                border:"solid 1px white",
                color:"white",
                fontWeight:"bold",
                backgroundColor:"#2080DFC9",

                borderRadius:4
            }} onClick={()=>{
                navigator("/login")
            }}>Already Have an Account</button>
        </div>
    </div>        
}