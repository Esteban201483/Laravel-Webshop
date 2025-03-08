<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model{

    protected $table = 'category';
    public $timestamps = false;
    protected $primaryKey = 'id';

    protected $fillable= [
        'name',
        'active'
    ];

    protected $hidden = [
        'id'
    ];
}



?>