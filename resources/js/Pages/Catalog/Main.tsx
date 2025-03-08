import { PageProps } from '@/types';
import  Header  from '../../Layouts/Header';
import { useState } from 'react';

import { isAuthenticated } from '@/services/authentication';
import  Support  from '../../Layouts/Support';


import '../../Layouts/products.css';


export default function Catalog({Products}: PageProps<{Products: any}>) {
    console.log(Products)
    const [productList, setProductList] = useState(Products);
    const authenticated = isAuthenticated();


    async function  addToWishlist(id: number, products:any){
 
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
        await fetch('wishlist', {method: "PUT", 
            headers: { "Content-Type" : "application/json" ,  "X-CSRF-TOKEN": csrfToken || ""}, 
            body: JSON.stringify({
                "id": id
            })
                })
            .then(response => {
                response.json();
                for(let product of products){
                    if(product.ID === id){
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
    
        await fetch('wishlist', {method: "DELETE", 
            headers: { "Content-Type" : "application/json" ,  "X-CSRF-TOKEN": csrfToken || ""}, 
            body: JSON.stringify({
                "id": id
            })
                })
            .then(response => {
                response.json();
                for(let product of products){
                    if(product.ID === id){
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

    async function  removeFromCart(id: number, products:any){

    }

    async function  addToCart(id: number, products:any){

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
        await fetch('cart', {method: "CREATE", 
            headers: { "Content-Type" : "application/json" ,  "X-CSRF-TOKEN": csrfToken || ""}, 
            body: JSON.stringify({
                "id": id
            })
                })
            .then(response => {
                response.json();
                for(let product of products){
                    if(product.ID === id){
                        product.cart_id = 1;
                        break;
                    }
                        
                }
            })
    
        setProductList((prevProducts:any) => 
            prevProducts.map((product:any) =>
                product.ID === id ? { ...product, cart_id: product.cart_id === null ? 1 : null } : product
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
                                <div className="product-name-container"><p className="product-name">{product.name}</p></div>
                                <div className="product-image-container"><img className="product-image" src={"/images/products/" + ((product.image)? product.image : 'default.svg')}></img></div>
                                <div className="product-price-container"><p>${product.base_price.toFixed(2)}</p></div>
                                <div className="flex flex-col">
                                {(product.cart_id !== null && authenticated)? <div className="product-action-container"><button className="main-button" onClick={() => {removeFromCart(product.ID, Products)}}>Remove from Cart</button></div> : <></>}
                                {(product.cart_id === null && authenticated)? <div className="product-action-container"><button className="main-button" onClick={() => {addToCart(product.ID, Products)}}>Add to Cart</button></div> : <></>}
                                {(product.user_id === null && authenticated)? <div className="product-action-container"><button className="secondary-button" onClick={() => addToWishlist(product.ID, Products)}>Add to Wishlist</button></div> : <></>}
                                {(product.user_id !== null && authenticated)? <div className="product-action-container"><button className="secondary-button" onClick={() => removeFromWishlist(product.ID, Products)}>Remove from Wishlist</button></div> : <></>}
                                </div>
                            </div>
                        ))
                    }</div>
                </section>
                <Support></Support>
            </div>
        </>
    )
}