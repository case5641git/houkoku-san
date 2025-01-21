<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
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
            'manager_id' => User::inRandomOrder()->first()->id,
            'reserver_num' => fake()->numberBetween(1, 100),
            'visitor_num' => fake()->numberBetween(1, 100),
            'reserver_contractor_num' => fake()->numberBetween(1, 100),
            'visitor_contractor_num' => fake()->numberBetween(1, 100),
            'sales' => fake()->numberBetween(1, 1000000),
            'customer_feedback' => fake()->realText(100),
            'crew_feedback' => fake()->realText(100),
            'created_at' => fake()->dateTimeBetween('-1 year', '+1 year')->format('Y/m/d H:m'),
        ];
    }
}
