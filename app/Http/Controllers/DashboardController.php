<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $products = Product::with('category')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('dashboard', [
            'total_orders' => Order::count(),
            'total_products' => Product::count(),
            'total_users' => User::count(),
            'recent_orders' => Order::with('user')->latest()->take(5)->get(),
            'products' => $products,
            'filters' => $request->only(['search']),
        ]);
    }
}
