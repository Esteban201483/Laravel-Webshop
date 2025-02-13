import { PageProps } from '@/types';
import  Header  from '../../Layouts/Header';
import { useState } from 'react';

import { isAuthenticated } from '@/services/authentication';

import '../../Layouts/products.css';


export default function Catalog({Products}: PageProps<{Products: any}>) {
    const [productList, setProductList] = useState(Products);
    const authenticated = isAuthenticated();


    async function  addToWishlist(id: number, products:any){
 
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
        await fetch('http://localhost:8000/wishlist', {method: "PUT", 
            headers: { "Content-Type" : "application/json" ,  "X-CSRF-TOKEN": csrfToken || ""}, 
            body: JSON.stringify({
                "id": id
            })
                })
            .then(response => {
                response.json();
                for(let product of products){
                    if(product.ID === id){
                        console.log("Encontrado");
                        product.user_id = 1;
                        break;
                    }
                        
                }
            })
    
        setProductList((prevProducts:any) => 
            prevProducts.map((product:any) =>
                product.ID === id ? { ...product, user_id: product.user_id === null ? 1 : null } : product
            )
        );
    
    }

    async function  removeFromWishlist(id: number, products:any){
 
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
        await fetch('http://localhost:8000/wishlist', {method: "DELETE", 
            headers: { "Content-Type" : "application/json" ,  "X-CSRF-TOKEN": csrfToken || ""}, 
            body: JSON.stringify({
                "id": id
            })
                })
            .then(response => {
                response.json();
                for(let product of products){
                    if(product.ID === id){
                        console.log("Encontrado");
                        product.user_id = null;
                        break;
                    }
                        
                }
            })
    
        setProductList((prevProducts:any) => 
            prevProducts.map((product:any) =>
                product.ID === id ? { ...product, user_id: product.user_id === null ? 1 : null } : product
            )
        );
    
    }
    
    return(
        <>
            <Header></Header>

        <div style={{'padding': '20px'}}>
            <section  className="main-component" style={{'margin': '12px 0 0 0'}}>
            <div id='products-container'>{
                Products.map((product:any , index:any) => (
                    <div className="product">
                        <p className="product-name">{product.name}</p>
                        <p>${product.base_price}</p>
                        <div className="flex flex-col">
                        {(true)? <div className="product-action-container"><button className="main-button" onClick={() => console.log("")}>Add to Cart</button></div> : <></>}
                        {(product.user_id === null && authenticated)? <div className="product-action-container"><button className="secondary-button" onClick={() => addToWishlist(product.ID, Products)}>Add to Wishlist</button></div> : <></>}
                        {(product.user_id !== null && authenticated)? <div className="product-action-container"><button className="secondary-button" onClick={() => removeFromWishlist(product.ID, Products)}>Remove from Wishlist</button></div> : <></>}
                        </div>
                    </div>
                ))
            }</div>
            </section>
        </div>
        </>
    )
}