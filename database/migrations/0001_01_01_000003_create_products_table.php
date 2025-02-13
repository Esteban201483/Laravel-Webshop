<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->index()->unique();
            $table->mediumText('description');
            $table->string('status')->default('active');
            $table->float('base_price');
   
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::dropIfExists('product');
 
    }
};
