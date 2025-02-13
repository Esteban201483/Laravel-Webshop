<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;

class CatalogController extends Controller{
    /**
     * Display the registration view.
     */
    public function create(): Response{
        //$products = Product::all();

       

        $products = DB::table('Product')
                        ->leftJoin("wishlist", function(JoinClause $join){
                            $userID = Auth::id();
                            $join->on("Product.ID","=","wishlist.product_id")
                                ->where("wishlist.user_id", "=", $userID);})
                        ->get();


        foreach($products as $product){
            //print_r($product->name);
        }
      

        return Inertia::render('Catalog/Main', [
            'Products' => $products
        ]);
    }
}
