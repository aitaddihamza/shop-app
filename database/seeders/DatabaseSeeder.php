<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\Bien;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        Bien::factory(20)->create();
        \App\Models\User::factory()->create([
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => bcrypt('test')
        ]);
    }
}
