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
        $user = auth()->user();
        $search = $request->input('search');

        if ($user->role === 'admin') {
            return $this->adminDashboard($request);
        }

        if ($user->role === 'shopkeeper') {
            return $this->sellerDashboard($request);
        }

        return $this->userDashboard($request);
    }

    protected function adminDashboard(Request $request)
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'total_revenue' => Order::where('status', 'paid')->sum('total_amount'),
                'total_commission' => Order::where('status', 'paid')->sum('admin_commission_amount'),
                'total_users' => User::count(),
                'total_products' => Product::count(),
            ],
            'recent_orders' => Order::with('user')->latest()->take(10)->get(),
            'role' => 'admin'
        ]);
    }

    protected function sellerDashboard(Request $request)
    {
        $user = auth()->user();
        return Inertia::render('dashboard', [
            'stats' => [
                'my_earnings' => $user->wallet->balance,
                'total_sales' => Order::whereHas('items.product', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->where('status', 'paid')->count(),
                'my_products' => Product::where('user_id', $user->id)->count(),
                'pending_orders' => Order::whereHas('items.product', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->where('status', 'pending')->count(),
            ],
            'recent_orders' => Order::whereHas('items.product', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->with('user')->latest()->take(10)->get(),
            'role' => 'seller'
        ]);
    }

    protected function userDashboard(Request $request)
    {
        $user = auth()->user();
        return Inertia::render('dashboard', [
            'stats' => [
                'wallet_balance' => $user->wallet->balance,
                'total_orders' => $user->orders()->count(),
                'active_orders' => $user->orders()->whereIn('status', ['pending', 'paid'])->count(),
            ],
            'recent_orders' => $user->orders()->latest()->take(5)->get(),
            'role' => 'user'
        ]);
    }
}
