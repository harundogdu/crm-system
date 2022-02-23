<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();
        $time = $this->faker->dateTimeBetween('-1 years', 'now');

        User::create([
            'name' => 'Admin',
            'email' => 'me@harundogdu.com',
            'email_verified_at' => $time,
            'password' => bcrypt('12345678'),
            'remember_token' => Str::random(10),
            'created_at' => $time,
            'updated_at' => $time,
        ]);

        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $this->faker->name,
                'email' => $this->faker->email,
                'email_verified_at' => $time,
                'password' => bcrypt("12345678"),
                'remember_token' => Str::random(60),
                'created_at' => $time,
                'updated_at' => $time,
            ]);
        }
    }
}
