import { PageProps } from '@/types';
import  Header  from '../../Layouts/Header';
import { useEffect, useState } from 'react';

import '../../Layouts/products.css';

function removeFromWishlist(id: number){
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    fetch('http://localhost:8000/wishlist', {method: "DELETE", 
        headers: { "Content-Type" : "application/json" ,  "X-CSRF-TOKEN": csrfToken || ""}, 
        body: JSON.stringify({
            "sku": id
        })
    })
        .then(response => response.json())
       

}

export default function Wishlist({products}: PageProps<{products: any}>){
    console.log(products);

    const emptyMessage = (products.length === 0)? 'No Items Found' : '';

    return(
        <>
        <Header></Header>
        <section  className="main-component" style={{'margin': '12px 0 0 0'}}>
            <h1>
                {emptyMessage}
            </h1>
            
            <div id='products-container'>{
                products.map((product:any , index:any) => (
                    <div className="product">
                        <p className="product-name">{product.name}</p>
                        <p>${product.base_price}</p>
                        <button  className="secondary-button" onClick={() => removeFromWishlist(product.id)}>Remove From Wishlist</button>
                    </div>
                ))
            }</div>
        </section>
        </>
    )
}