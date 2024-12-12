import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import { UserData } from "../redux/slicers/userSlicer";
import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "../request";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/slicers/alertSlicer";
import Header1 from "../components/headers/header_1";
import { checkAuth } from "../settings/basic";
import SearchSection from "../components/headers/search_section";
import LoadingSquare from "../components/LoadingSquare";
import '../css/productPage.css'
import GeneralInfo from "../components/ProductGeneralInfo";
import ProductDescription from "../components/ProductDescription";
import ProductReview from "../components/ProductReview";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}
interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

const navigation_btns=["General Info","Product Description","Reviews"]

export default function ProductPage(): ReactElement {
  const user: UserData = useSelector((state: StoreType) => state.user),
    navigator = useNavigate();
  const { productId } = useParams();
  

  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [windowSize, setWindowSize] = useState<boolean>(true);
  const [currentNavigation, setCurrentNavigation] = useState(0)
  const [navScreens, setNavScreens] = useState<ReactElement[]>([])

  useEffect(() => {
    if (!user.loaded) {
      navigator("/", { state: { redirect: "/product/" + productId } });
      return;
    }

    type Response = {
      sts: boolean;
      product?: Product;
      msg?: string;
    };
    axios
      .get(`/get-product?product_id=${productId}`)
      .then(async (prod: AxiosResponse<Response>) => {
        if (!prod.data.sts) {
          let auth = await checkAuth();
          if (!auth) navigator("/");
          dispatch(showAlert({ msg: prod.data.msg }));
          return;
        }

        setProduct(prod.data.product!);

        setNavScreens([
          <GeneralInfo product={prod.data.product!}/>,
          <ProductDescription product={prod.data.product!}/>,
          <ProductReview product={prod.data.product!}/>
        ])

      });
  }, [user]);
  useEffect(() => {
    window.onresize = () => {
      setWindowSize(!windowSize);
    };

  }, []);

  return (
    <div id="product_page">
      <Header1 />
      <SearchSection />

      {!product ? (
        <LoadingSquare width={"100%"} height={"80vh"} />
      ) : (
        <div
          style={{
            paddingInline: window.innerWidth * 0.05,
          }}
        >
          <div>
            <h1
              style={{
                color: "var(--theme_sub)",
              }}
            >
              {product.title}
            </h1>
          </div>
          <div style={{
            display:"flex",

            gap:20
          }}>
            {
              navigation_btns.map((btn,i)=>{
                return <button key={i} className={`navigation_btns ${currentNavigation===i?"selected":""}`} onClick={()=>{
                  
                  setCurrentNavigation(i)
                }}>{btn}</button>
              })
            }
            
          </div>
          <hr style={{alignSelf:"center",width:"100%",marginTop:30}} />
          {
            navScreens[currentNavigation]
          }
        </div>
      )}
      
      <div className="mt_5"></div>
    </div>
  );
}



export type {Product}