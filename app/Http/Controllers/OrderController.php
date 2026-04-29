<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('orders/index', [
            'orders' => auth()->user()->role === 'admin' 
                ? Order::with(['items.product', 'user'])->latest()->get()
                : auth()->user()->orders()->with('items.product')->latest()->get()
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);
        
        return Inertia::render('orders/track', [
            'order' => $order
        ]);
    }
}
