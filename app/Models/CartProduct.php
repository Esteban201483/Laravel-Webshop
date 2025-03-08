<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartProduct extends Model{

    protected $table = 'cart_vs_product';
    public $timestamps = false;

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable= [
        'cart_id',
        'product_id',
        'active'
    ];

    protected $hidden = [
        'id'
    ];
}



?>