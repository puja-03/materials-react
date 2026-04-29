<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'total_amount' => fake()->randomFloat(2, 500, 50000),
            'status' => fake()->randomElement(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
            'shipping_address' => fake()->address(),
            'phone_number' => fake()->phoneNumber(),
            'pincode' => fake()->postcode(),
            'payment_method' => fake()->randomElement(['COD', 'UPI', 'Card']),
        ];
    }
}
