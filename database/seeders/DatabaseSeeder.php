<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create System Admin
        User::factory()->admin()->create([
            'name' => 'System Admin',
            'email' => 'admin@materials.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        // 2. Create Demo Shopkeeper
        User::factory()->shopkeeper()->create([
            'name' => 'Hardik Hardware',
            'email' => 'shop@materials.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        // 3. Create Demo Client
        User::factory()->create([
            'name' => 'Rajesh Contractor',
            'email' => 'client@materials.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        // 4. Create Hardware Categories
        $categories = [
            ['name' => 'Door Handles', 'icon' => 'door_sliding'],
            ['name' => 'Locks & Latches', 'icon' => 'lock'],
            ['name' => 'Cabinet Fittings', 'icon' => 'kitchen'],
            ['name' => 'Screws & Fasteners', 'icon' => 'build'],
            ['name' => 'Tools & Equipment', 'icon' => 'handyman'],
            ['name' => 'Safety Gear', 'icon' => 'engineering'],
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => \Illuminate\Support\Str::slug($cat['name']),
                'icon' => $cat['icon'],
            ]);
        }

        // 5. Create Products for each category
        $categoryModels = Category::all();
        foreach ($categoryModels as $category) {
            Product::factory(8)->create([
                'category_id' => $category->id,
            ]);
        }

        // 6. Create Random Orders and Items
        User::factory(10)->create()->each(function ($user) {
            Order::factory(rand(1, 3))->create([
                'user_id' => $user->id,
            ])->each(function ($order) {
                $products = Product::inRandomOrder()->limit(rand(2, 5))->get();
                $total = 0;
                foreach ($products as $product) {
                    $qty = rand(1, 10);
                    $price = $product->price;
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'price' => $price,
                    ]);
                    $total += ($price * $qty);
                }
                $order->update(['total_amount' => $total]);
            });
        });
    }
}
