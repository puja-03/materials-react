<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\WalletService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('orders/index', [
            'orders' => auth()->user()->role === 'admin'
                ? Order::with(['items.product', 'user'])->latest()->get()
                : auth()->user()->orders()->with('items.product')->latest()->get(),
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);

        return Inertia::render('orders/track', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate(['status' => 'required|in:pending,paid,dispatched,delivered,cancelled']);
        $order->update(['status' => $request->status]);

        if ($request->status === 'paid') {
            app(WalletService::class)->processOrderPayment($order->fresh(['items.product.seller']));
        }

        return back()->with('success', 'Order status updated.');
    }

    public function refund(Order $order)
    {
        app(WalletService::class)->refundOrder($order->load('items.product.seller'));

        return back()->with('success', 'Order refunded to customer wallet.');
    }
}
