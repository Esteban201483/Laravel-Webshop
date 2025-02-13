<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model{

    protected $table = 'Product';
    public $timestamps = false;
    protected $primaryKey = 'ID';

    protected $fillable= [
        'ID',
        'sku',
        'name',
        'description',
        'base_price'
    ];

    protected $hidden = [
        'status'
    ];
}

?>