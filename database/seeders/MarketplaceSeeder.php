<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarketplaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Handles', 'slug' => 'handles', 'icon' => 'door_handle'],
            ['name' => 'Locks', 'slug' => 'locks', 'icon' => 'lock'],
            ['name' => 'Screws', 'slug' => 'screws', 'icon' => 'hardware'],
            ['name' => 'Hinges', 'slug' => 'hinges', 'icon' => 'door_sensor'],
            ['name' => 'Tools', 'slug' => 'tools', 'icon' => 'hand_repair'],
            ['name' => 'Fittings', 'slug' => 'fittings', 'icon' => 'plumbing'],
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::create($cat);
        }

        $products = [
            [
                'category_id' => 1,
                'name' => 'Premium Satin Brass Door Handle',
                'slug' => 'premium-satin-brass-door-handle',
                'description' => 'Industrial Grade 304 Stainless Steel',
                'price' => 2499.00,
                'unit' => 'piece',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHpxpjOQlHcJ6we4kv9anRRgxQDa85NhGj62jbmN2WimOFgRaWA1lhiPMmKGC99F5cBWCUTpuPs-2pyS1bi3ifBqkAypNLiFOGwr8x6nXYmW2jeyQ34jiAg4jT23eOasihSdzMvfP5A8x3yEA4IL5cdXTyzDunbnEbLceZOETBFOKXxBtfrImnciG3BJ0jySLkdUeEw7chQHYLaPCAw6k-wITcpEmQNU7MuPkpDiK1BOQ2Ko7Bf5WnZ86JxaUOFTNFe1pQbdkEnvAG',
                'vendor_name' => 'BuildReady Solutions',
            ],
            [
                'category_id' => 2,
                'name' => 'Digital Smart Deadbolt Lock',
                'slug' => 'digital-smart-deadbolt-lock',
                'description' => 'Bluetooth & Fingerprint Enabled',
                'price' => 8990.00,
                'unit' => 'piece',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVoO2Iuc2q6St-aajak7oQYUUf9YYyWkglErdXIcsVroPLzW7K6917fnomotSG69U1J4s9q5DydS056eM8NDfKjXqF5475soxQNruFiDlrRdV6eJ8lVl_VTkzjvDn75H7uY7wc-K0-tlpazZxgTXa36v1Ei5-zPZw1qtP4GaBuhXQ86rDyDYeVIIP_EFwJHWMwy9PJw7Q6JnbJDUCyyrs8Ldj4CyefGC6vTyojYicsIC4IzIL4CGBw0rGGtacDS6NRQxqD6oNiqpc1',
                'vendor_name' => 'SecureLock Systems',
            ],
            [
                'category_id' => 3,
                'name' => 'Galvanized Wood Screws (5kg)',
                'slug' => 'galvanized-wood-screws-5kg',
                'description' => 'Weather Resistant Coating',
                'price' => 1250.00,
                'unit' => 'box',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJrkliRj0cBEP2tOkSRTm8bsJ0nu0dGsyMpXZv1KB5zyaGubMICSsKLOjJSGQXGOwOO5Q33o-v55Hrfj1vFvCqbtKBnAclElf3pdrOFzf-gu59GevuHfztdsfFhNea02yMC_fKpMuM5bgTTPjvgtdBB5J2qzGwWqhGxfnLoSeMRXhZ8WUn0D6FypRVMz8jJgMr3GPoAO2GafuNxeZTiYa1lEfOAIu9fmLaR5ON6xf5OTMb6GqNVRryO1pbRn7ldyTZIsABIOl7hMCR',
                'vendor_name' => 'BuildReady Solutions',
            ],
            [
                'category_id' => 4,
                'name' => 'Heavy Duty Ball Bearing Hinge',
                'slug' => 'heavy-duty-ball-bearing-hinge',
                'description' => 'Set of 3, Polished Chrome',
                'price' => 850.00,
                'unit' => 'set',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLOaf06yAgd_-tvZ44sw7Hax1Hv1FnXDfuLvrDrNsreE1HKJge-hhW7FslUH4W2PzkVm0s9XwV9ov1R9vIdxWxT4prxuHj5ldeco1g3GQL2Bf__pYyc5dvUQQ9rNw7J85A5U9rogJQQNIq5UzxWMokLipuDdSwSXdMD8-74ZtXw3wbPc05-jeaWsLBKnPjmKKDr-SrsVR47nTZRJ_pFqZrwpkjBbnK5VWAL0igbzum7tLuNHMz9_obwUDCYTtLbwxrVmjhe8laf7Vp',
                'vendor_name' => 'HingeMasters',
            ],
            [
                'category_id' => 5,
                'name' => '20V Cordless Impact Drill Kit',
                'slug' => '20v-cordless-impact-drill-kit',
                'description' => 'Includes 2 Batteries & Case',
                'price' => 12400.00,
                'unit' => 'kit',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAKcPl-8pHfbXGbmnNFAowI43MaHXYX3FQDD2SKbzSrzA2dG2WX6AIuwKqcU5zP_R8PuDY5Bynh6McYcKnV7XGXHj668y6BEFRISQA4Jjlvs1JgWSjCU1pA-ZAH-T8PiqmOwVUOgYts30RRostm6OzZv3v_OObms4Q9er9T4Rf6HHRKEDOoGvcSPfywb0Jyd6nmKD85JmipZwdSkjHhb4dfRea7lnXl325hoXAviiMZ48Uv8aoXSt5YhtK3kAoisspvgR2Gx3ojnPb',
                'vendor_name' => 'PowerTool Pros',
            ],
            [
                'category_id' => 1,
                'name' => 'Modern Minimalist Cabinet Pull',
                'slug' => 'modern-minimalist-cabinet-pull',
                'description' => 'Pack of 10, Matte Black',
                'price' => 3200.00,
                'unit' => 'pack',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXs3vXsAOVSPQxDTbxCEIYcPocYsZ_epts5pQdNVvaCk28_GNmMuZd50__PdjnsyrIAGqiCwwthy8d_a5nGG8fyYpayYfPfS7j_emmM4rT-jJ2QQ64GyNVVsR4JYcdIJIkUl59lPmVf4_L5fQVXGxMZQggcOmVXJsoo-LTgjZeRj8Cy3rM0yxStJf5-yrChkBLpo9WXMX39p9knzLxDljWXJbWnQ_pINmzwzrQPI47q11ndxAQkSRQB3hZrzuKyA1g8CaqMRZvz57v',
                'vendor_name' => 'BuildReady Solutions',
            ],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }

        // Create a test user and some orders
        $user = \App\Models\User::firstOrCreate(
            ['email' => 'admin@materialsmarket.com'],
            [
                'name' => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );

        $order = \App\Models\Order::create([
            'user_id' => $user->id,
            'total_amount' => 17250.00,
            'status' => 'dispatched',
            'shipping_address' => 'Plot No. 42, Industrial Area Phase 2, Mumbai',
            'phone_number' => '+91 98765 43210',
            'pincode' => '400001',
            'payment_method' => 'cod',
        ]);

        \App\Models\OrderItem::create([
            'order_id' => $order->id,
            'product_id' => 1,
            'quantity' => 10,
            'price' => 4500.00,
        ]);

        \App\Models\OrderItem::create([
            'order_id' => $order->id,
            'product_id' => 2,
            'quantity' => 5,
            'price' => 12750.00,
        ]);
    }
}
