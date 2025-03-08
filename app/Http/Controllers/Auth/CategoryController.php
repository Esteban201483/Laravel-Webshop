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

use Illuminate\Http\JsonResponse;

class CategoryController extends Controller{
    /**
     * Display the registration view.
     */
    public function getCategories(): JsonResponse{
        $result = ['status' => true, 'msg' => '', 'categories' => []];

        $result['categories'] = DB::table('category')
        ->where('active','=',true)
        ->get();


        return response()->json($result);
    }
}
