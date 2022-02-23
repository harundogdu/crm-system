<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();
        for ($i=0; $i < 1000; $i++) { 
            Product::create([
                'name' => $this->faker->word,
                'category_id' => mt_rand(1,50),
                'user_id' => mt_rand(1,11),
                'modelCode' => $this->faker->word,
                'barcode' => $this->faker->word,
                'brand' => $this->faker->word,
                'image' => $this->faker->word,
                'description' => $this->faker->sentence,
                'buyingPrice' => $this->faker->randomFloat(2, 0, 100),
                'sellingPrice' => $this->faker->randomFloat(2, 0, 100),
                'taxPrice' => $this->faker->randomFloat(2, 0, 100),
                'discount' => $this->faker->randomFloat(2, 0, 100),
                'quantity' => $this->faker->randomDigit,
                'created_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
            ]);
        }
    }
}
