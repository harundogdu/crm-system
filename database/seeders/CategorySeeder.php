<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();
        
        for ($i=0; $i < 10; $i++) { 
            Category::create([
                'user_id' => mt_rand(1,2),
                'name' => $this->faker->word,
                'created_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
            ]);
        }
    }
}
