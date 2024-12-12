import { ReactElement, useEffect, useState } from "react";
import { Product } from "../pages/ProductPage";
import $ from "jquery";
import LoadingSquare from "./LoadingSquare";
import { AxiosResponse } from "axios";
import  visaImage from '../assets/icons/Visa_Inc._logo.svg'
import masterCard from '../assets/icons/master card logo.svg'
import paypalImage from '../assets/icons/paypal logo.svg'
import axios from '../request'
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/slicers/alertSlicer";
import { CartState, updateCart } from "../redux/slicers/cartSlice";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import { refreshCart, refreshFav } from "../settings/globalSlice";
import { FavState, updateFav } from "../redux/slicers/favSlice";


interface Charge {
  type: string;
  timeTake: string;
  price: string;
  id: number;
}

let staring = [0, 0, 0, 0, 0];

export default function GeneralInfo({
  product,
}: {
  product: Product;
}): ReactElement {


  const [imageLoaded, setImageLoaded] = useState(false);
  const [staring, setStaring] = useState<number[]>([0, 0, 0, 0, 0]);
  const [qty, setQty] = useState(1);
  const [deliveryCharge, setDeliveryCharge] = useState<Charge[] | null>(null);
  const [cartSts, setCartSts] = useState<boolean|null>(false)
  const [fav, setFav] = useState<boolean|null>(false)

  const dispatch=useDispatch()
  const cart=useSelector((state:StoreType)=>state.cart)
  const fvrt=useSelector((state:StoreType)=>state.fav)

  useEffect(() => {
    $("#product_general img").on("load", (e) => {
      setImageLoaded(true);
    });

    for (let i = 0; i < Math.floor(product.rating); i++) {
      staring[i] = 1;
    }
    setStaring(staring.filter((x) => true));

    type Response = {
      sts: boolean;
      charges?: Charge[];
      msg?: string;
    };
    axios.get("/cart/delivery-charge").then((res: AxiosResponse<Response>) => {
      if (!res.data.sts) return;

      setDeliveryCharge(res.data.charges!)
    });

    return ()=>{
      $('#product_general img').off('load')
    }
  }, []);

  useEffect(()=>{

    (async()=>{
      let cartData
      if(!Object.keys(cart).length){
     
        cartData=await refreshCart()
   
        if(!cartData)return
    
        cartData=cartData as CartState
        dispatch(updateCart(cartData))
        
      }else cartData=cart
      if(cartData[product.id])setCartSts(true)

    })();

    (async()=>{
      let favData
 
      if(!fvrt.length){
        favData=await refreshFav()
   
        if(!favData)return
    
        favData=favData as FavState
        dispatch(updateFav(favData))
      }else favData=fvrt

      if(fvrt.indexOf(product.id.toString())!=-1)setFav(true)
    })()
    
    
  },[])


  return (
    <div
      style={{
        display: "flex",

        flexWrap: "wrap",

        justifyContent: "center",

        paddingInline: 10,
      }}
      id="product_general"
    >
      <div
        style={{
          width: "50%",
          minWidth: "300px",

          height: window.innerHeight * 0.62,
        }}
      >
        <img
          src={product.images[0]}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: imageLoaded ? "initial" : "none",
            objectPosition: "center",
          }}
        />
        {!imageLoaded && <LoadingSquare width={"100%"} height={"100%"} />}
      </div>
      <div
        style={{
          width: "47%",
          minWidth: "300px",

          display: "flex",
          flexDirection: "column",
          padding:10
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",

            marginTop: 20,

            alignItems: "center",
            justifyContent: "space-between",

            rowGap: 20,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                fontSize: 22,

                fontWeight: "bold",

                color: "var(--theme_sub)",
              }}
            >
              $ {product.price}
            </span>
            <span
              style={{
                fontSize: 20,

                color: "grey",

                textDecoration: "line-through",
              }}
            >
              $
              {Math.round(
                product.price/(1-(product.discountPercentage/100))
              ).toFixed(2)}
            </span>
            <span
              style={{
                color: "white",
                background: "var(--theme_main)",
                display: "flex",

                alignItems: "center",

                fontSize: 14,
                height: 25,

                paddingInline: 5,

                borderRadius: 3,
              }}
            >
              -{product.discountPercentage}%
            </span>
          </div>
          <div
            style={{
              display: "flex",

              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",

                gap: 5,
              }}
            >
              {staring.map((e, i) => {
                if (!e)
                  return (
                    <i
                      key={i}
                      className="fa-regular fa-star"
                      style={{ color: "grey" }}
                    ></i>
                  );
                return (
                  <i
                    key={i}
                    className="fa-solid fa-star"
                    style={{
                      color: "#FCDB23FF",
                    }}
                  ></i>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "grey",
                }}
              >
                {product.reviews.length} Reviews
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",

            display: "flex",

            flexWrap: "wrap",

            marginTop: 50,

            gap: 20,
            rowGap: 40,

            justifyContent: "space-between",
          }}
        >
          <div className="row center" style={{ gap: 5 }}>
            <i
              className="fa-solid fa-circle-minus scale_animation"
              style={{ color: "var(--theme_sub)" }}
              onClick={() => {
                if (qty == 1) return;
                setQty(qty - 1);
              }}
            ></i>
            <input
              type="text"
              readOnly
              style={{
                outline: "none",

                width: 50,
                height: 30,

                border: "solid 1px var(--theme_sub)",
                borderRadius: 7,
                textAlign: "center",

                color: "var(--theme_sub)",

                fontWeight: "bold",
              }}
              value={qty}
            />
            <i
              className="fa-solid fa-circle-plus scale_animation"
              style={{ color: "var(--theme_sub)" }}
              onClick={() => {
                if (qty == 10) return;
                setQty(qty + 1);
              }}
            ></i>
          </div>
          <button
            className="scale_animation"
            style={{
              paddingInline: 20,

              background: "#2DAA7AFF",

              color: "white",

              border: "none",
              borderRadius: 5,
              height: 40,

              fontWeight: "bold",
              ...(cartSts===null?{background:"none",color:"grey",border:"solid 1px grey"}:{}),
              ...(cartSts===true?{background:'none',color:'#F01A36FF',border:"solid 1px #F01A36FF"}:{})
            }}

            onClick={async()=>{

              if(cartSts===null)return

              setCartSts(null)

              type Response={
                sts:boolean,
                msg?:string,
                cart?:any
              }

              
              if(cart[product.id]){
                console.log('inside')
                
                const res:AxiosResponse<Response>=await axios.delete(`/cart/remove/${product.id}`)

                if(!res.data.sts)return dispatch(showAlert({msg:res.data.msg}))
                
                console.log(res.data)
                dispatch(updateCart(res.data.cart))

                setCartSts(false)
                return

              }


              

              

              axios.post('/cart/add-new',{qty,productId:product.id}).then((res:AxiosResponse<Response>)=>{
                if(!res.data.sts)return dispatch(showAlert({msg:res.data.msg}))
                
                dispatch(updateCart(res.data.cart))
                setCartSts(true)
              })
            }}
          >
            {
              cartSts===false?<><i className="fa-solid fa-cart-shopping"></i> add to cart</>:(cartSts===null?<><i className="fa-solid fa-gear rotate_animation"></i> adding to cart</>:<><i className="fa-solid fa-trash"></i> remove from cart</>)
            }
            
          </button>
          <button
            className="scale_animation"
            style={{
              width:120,

              paddingInline: 20,

              background: "none",

              color: "#D0133CFF",

              border: "solid 1.3px #D0133CFF",
              borderRadius: 5,
              height: 40,

              fontWeight: "bold",
              ...(fav?{color:'white',background:"#D0133CFF"}:{})
            }}

            onClick={async()=>{

            
              if(fav===null)return 

              setFav(null)

              type Response={
                sts:boolean,
                msg?:string,
                fav?:FavState
              }

              if(fav==true){
                let data:AxiosResponse<Response>=await axios.delete(`/fav/remove/${product.id}`)

                if(!data.data.sts) return dispatch(showAlert({msg:data.data.msg}))
                
                dispatch(updateFav(data.data.fav!))

                setFav(false)
                return
              }
            
              let res:AxiosResponse<Response>=await axios.post(`/fav/add-new/${product.id}`)

              console.log(res.data)
              if(!res.data.sts)return dispatch(showAlert({msg:res.data.msg}))
              
              dispatch(updateFav(res.data.fav!))
              setFav(true)
            }}
          >
            <i className="fa-regular fa-heart"></i> {fav?"Remove":"Favourite"}
          </button>
        </div>
        <div
          style={{
            marginTop: 30,
            display: "flex",

            flexDirection: "column",

            gap: 10,
          }}
        >
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Delivery
          </span>
          <span>
            Free standard shipping on orders over $45, plus free return
          </span>
          <div
            style={{
              display: "flex",

              marginTop: 30,

              flexDirection: "column",
            }}
          >
            <div style={{
                        width:'100%',
        
                        borderBottom:"solid .5px grey",
                        paddingBlock:15,
        
                        paddingInline:5,

                        display:"grid",

                        gridTemplateColumns:"33% 34% 33%"
                    }}>
              <span style={{ color: "grey" }}>TYPE</span>
              <span style={{ color: "grey" }}>HOW LONG</span>
              <span style={{ color: "grey" }}>HOW MUCH</span>
            </div>
            {
                !deliveryCharge?<LoadingSquare width={'100%'} height={300}/>: deliveryCharge.map(charge=>{
                    return <div key={charge.id}  style={{
                        width:'100%',
        
                        borderBottom:"solid .5px grey",
                        paddingBlock:15,
        
                        paddingInline:5,

                        display:"grid",

                        gridTemplateColumns:"33% 34% 33%"
                    }}>
                        <span>{charge.type}</span>
                        <span>{charge.timeTake} business days</span>
                        <span>${charge.price}</span>
                    </div>
                })
            }
    
          </div>
        </div>
        <div className="column" style={{
            marginTop:50
        }}>
            <span style={{
                fontWeight:"bold"
            }}>Return</span>
            <span style={{
              color:"grey",

              marginTop:20
            }}>You have 60 days to return the item(s) using any of the following methods</span>
            <ul style={{
              color:"grey"
            }}>
                <li>Free Store Return</li>
                <li>Free return via USPS Service</li>
            </ul>
        </div>
        <hr style={{
          width:"100%"
        }}/>
        
        <div className="row center_y mt_4" style={{gap:20}}>
          <span style={{fontWeight:"bold"}}>Share:</span>
          <i className="fa-brands fa-facebook-f" style={{color:"#605A5AFF"}}></i>
          <i className="fa-brands fa-x-twitter" style={{color:"#605A5AFF"}}></i>
          <i className="fa-brands fa-pinterest-p" style={{color:"#605A5AFF"}}></i>
          <i className="fa-brands fa-instagram" style={{color:"#605A5AFF"}}></i>
        </div>
      </div>
      <div className="row mt_5" style={{width:"100%",justifyContent:"space-around",gap:20}}>
        <div className="row center" style={{
          width:window.innerWidth<500?100:150,
  
          height:window.innerWidth<500?50:100,

          background:"#F7F1F1FF",

          border:"solid 1px grey",
          borderRadius:8
        
        }}>
          <img src={visaImage} alt="" style={{
            width:"80%",
            height:"80%",

            objectFit:"contain"
          }} />
        </div>
        <div className="row center" style={{
      
          width:window.innerWidth<500?100:150,
  
          height:window.innerWidth<500?50:100,

          background:"#F7F1F1FF",

          border:"solid 1px grey",
          borderRadius:8
        
        }}>
          <img src={masterCard} alt="" style={{
            width:"80%",
            height:"80%",

            objectFit:"contain"
          }} />
        </div>
        <div className="row center" style={{
          width:window.innerWidth<500?100:150,
  
          height:window.innerWidth<500?50:100,

          background:"#F7F1F1FF",

          border:"solid 1px grey",
          borderRadius:8
        
        }}>
          <img src={paypalImage} alt="" style={{
            width:"80%",
            height:"80%",

            objectFit:"contain"
          }} />
        </div>
      </div>
    </div>
  );
}
