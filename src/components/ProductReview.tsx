import React, { ReactElement } from 'react'
import { Product } from '../pages/ProductPage'

const fiveStar=[1,1,1,1,1]
export default function ProductReview({product}:{product:Product}):ReactElement {
  return (
    <div id='product_review' className='mt_3 column' style={{gap:20}}>
        <h2>Reviews </h2>

        {
            product.reviews.map((rev,i)=>{
                return (
                    <div key={i} className='column scale_animation' style={{
                        border:"solid 1px var(--theme_sub)",
                        paddingInline:5,
                        paddingBlock:10,
                        borderRadius:8,
                        
                    }}>
                        <div className='row' style={{flexWrap:'wrap',justifyContent:'space-between'}}>
                            <span style={{fontSize:'1.1rem',fontWeight:'bold'}}>{rev.reviewerName}</span>
                            <div className='row center_y' style={{gap:4}}>
                            {
                                fiveStar.map((e,i)=>{
                                    
                                    
                                    if(i>Math.floor(rev.rating))return <i key={i} className="fa-regular fa-star" style={{color:"grey"}}></i>
                                    return (
                                        <i key={i} className="fa-solid fa-star" style={{color:"#EECF07FF"}}></i>
                                    )
                                })
                            }
                            </div>
                            
                        </div>
                        
                        <span style={{color:"grey"}}>{rev.reviewerEmail}</span>
                        <span className='mt_1'>{rev.comment}</span>
                    </div>
                )
            })
        }

        
    </div>
  )
}
