<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model{

    protected $table = 'cart';
    public $timestamps = false;

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable= [
        'user_id',
        'product_id',
        'active'
    ];

    protected $hidden = [
        'id'
    ];
}



?>