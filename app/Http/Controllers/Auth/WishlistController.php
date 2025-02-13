<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
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

class WishlistController extends Controller{
    /**
     * Display the wishlist view.
     */
    public function create(): Response{
        $userID = Auth::id();
        $products = [];

        if($userID){
            $products = DB::table('wishlist')
                        ->join('Product', 'wishlist.product_id', '=', 'Product.ID')
                        ->where('wishlist.user_id',$userID)
                        ->get();
        }

        return Inertia::render('Wishlist/wishlist',[
            'products' => $products
        ]);
    }


    public function delete(Request $request): JsonResponse{
        $result = ['status' => true, 'msg' => ''];

        $userID = Auth::id();
        $productID = $request->input('id');

        Wishlist::where('product_id',$productID)->where('user_id',$userID)->delete();

        $result['msg'] = 'Testing delete endpoint';

        return response()->json($result);
    }

    public function add(Request $request): JsonResponse{
        $result = ['status' => true, 'msg' => ''];

        $productID = $request->input('id');
        $userID = Auth::id();

        $wishlist = new Wishlist();
        $wishlist->user_id = $userID;
        $wishlist->product_id = $productID;
        $wishlist->save();
 

        return response()->json($result);
    }
}
