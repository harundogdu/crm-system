<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('modelCode')->nullable();
            $table->string('barcode')->nullable();
            $table->string('brand')->nullable();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->double('buyingPrice')->nullable();
            $table->double('sellingPrice')->nullable();
            $table->double('taxPrice')->nullable();
            $table->double('discount')->nullable();
            $table->integer('quantity')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
