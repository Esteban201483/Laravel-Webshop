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

class CatalogController extends Controller{
    /**
     * Display the registration view.
     */
    public function create(): Response{
        $products = Product::all();


        foreach($products as $product){
            //print_r($product->name);
        }
      

        return Inertia::render('Catalog/Main', [
            'Products' => $products
        ]);
    }
}
