<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Report;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'report_id' => Report::inRandomOrder()->first()->id,
            'message' => fake()->realText(1000),
            'created_at' => fake()->dateTimeBetween('-1 year', '+1 year')->format('Y/m/d H:m'),
        ];
    }
}
