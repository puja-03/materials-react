<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'total_orders' => Order::count(),
            'total_products' => Product::count(),
            'total_users' => User::count(),
            'recent_orders' => Order::with('user')->latest()->take(5)->get(),
        ]);
    }
}
