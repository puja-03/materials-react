<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function show($id)
    {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);
        
        return Inertia::render('orders/track', [
            'order' => $order
        ]);
    }
}
