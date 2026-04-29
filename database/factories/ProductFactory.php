<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);
        return [
            'name' => ucfirst($name),
            'slug' => \Illuminate\Support\Str::slug($name) . '-' . rand(1000, 9999),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 50, 5000),
            'stock' => fake()->numberBetween(10, 500),
            'unit' => 'pcs',
            'image_url' => 'https://picsum.photos/seed/' . rand(1, 1000) . '/600/600',
            'vendor_name' => fake()->company(),
            'category_id' => \App\Models\Category::factory(),
        ];
    }
}
