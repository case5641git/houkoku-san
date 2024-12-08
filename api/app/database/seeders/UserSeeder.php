<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(
            [
                'id' => (string) Str::uuid(),
                'name' => 'テスト太郎',
                'email' => 'taro@example.com',
                'password' => bcrypt('password'),
                'role' => 1,
                'department' => 6400,
            ]);
        User::create([
                'id' => (string) Str::uuid(),
                'name' => 'テスト花子',
                'email' => 'hanako@example.com',
                'password' => bcrypt('password'),
                'role' => 2,
                'department' => 6400,
        ]);
        User::create([
                'id' => (string) Str::uuid(),
                'name' => 'テスト次郎',
                'email' => 'jiro@example.com',
                'password' => bcrypt('password'),
                'role' => 2,
                'department' => 6400,
        ]);
        User::create([
                'id' => (string) Str::uuid(),
                'name' => 'テストサトシ',
                'email' => 'satoshi@example.com',
                'password' => bcrypt('password'),
                'role' => 2,
                'department' => 6400,
        ]);
        User::factory(10)->create();
    }
}
