<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class CartController extends Controller{

    /**
     * Display the cart. If cart not exists then creates it
     */
    private function getCartInfoOrInitCart(){
        $cartInfo = ['id' => null, 'products' => []];
 
        $userID = Auth::id();

        $cart = DB::table("cart")
            ->where("cart.user_id","=",$userID)
            ->where("cart.active","=",true)
            ->get();

        if(count($cart) === 0){
            $cart = new Cart;

            $cart->user_id = $userID;
            $cart->save();
        }else{
            
            $cart = $cart[0];
            $cartID = $cart->id;

            $products = DB::table("cart_vs_product")
                        ->where("cart_id","=",$cartID)
                        ->get();

            foreach($products as $product){
                //TODO: Check items
                $cartInfo['products'] = $product;
            }

            $cartInfo['id'] = $cartID;

        }

        return $cartInfo;
    }

    public function getCartInfo(): Array{
        $result = ['id' => null];
        $userID = Auth::id();

        if($userID){
            $result = $this->getCartInfoOrInitCart();
        }
        return $result;
    }

    /**
     * Display the cart. If cart not exists then creates it
     */
    public function get(): Response{
        $userID = Auth::id();
        $products = [];

        if($userID){
            /*$products = DB::table('wishlist')
                        ->join('Product', 'wishlist.product_id', '=', 'Product.ID')
                        ->where('wishlist.user_id',$userID)
                        ->get();*/

        }

        return Inertia::render('Catalog/Cart',[
            'products' => $products
        ]);
    }


    /**
     * Delete a item from the cart
     */
    public function delete(Request $request): JsonResponse{
        $result = ['status' => true, 'msg' => ''];

        /*$userID = Auth::id();
        $productID = $request->input('id');

        Wishlist::where('product_id',$productID)->where('user_id',$userID)->delete();

        $result['msg'] = 'Testing delete endpoint';*/

        return response()->json($result);
    }

    /**
     * Set a cart as inactive
     * This method should be called after setting an order
     */
    public function finish(){
        
    }

    /**
     * Adds a item to the cart
     */
    public function addItem(Request $request): JsonResponse{
        $result = ['status' => true, 'msg' => ''];


        $cartInfo = $this->getCartInfoOrInitCart();
        $CartProduct = new CartProduct();
        $CartProduct->cart_id = $cartInfo['id'];
        $CartProduct->product_id = $request->input('id');
        $CartProduct->save();

        return response()->json($result);
    }
}
