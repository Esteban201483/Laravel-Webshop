<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model{

    protected $table = 'wishlist';
    public $timestamps = false;

    protected $primaryKey = 'ID';
    public $incrementing = false;

    protected $fillable= [
        'user_id',
        'product_id',
    ];

    protected $hidden = [
        'ID'
    ];
}



?>