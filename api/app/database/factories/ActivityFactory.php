<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Message;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message_id' => Message::inRandomOrder()->first()->id,
            'read_flag' => fake()->boolean(),
            'created_at' => fake()->dateTimeBetween('-1 year', '+1 year')->format('Y/m/d H:m'),
        ];
    }
}
