<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'pincode' => 'required|string|max:10',
            'payment_method' => 'required|string',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated) {
            $totalAmount = 0;
            $itemsToCreate = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $price = $product->price * $item['quantity'];
                $totalAmount += $price;

                $itemsToCreate[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];
            }

            // Add GST 18%
            $totalAmount *= 1.18;

            $order = Order::create([
                'user_id' => Auth::id() ?? 1, // Fallback for demo
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'shipping_address' => $validated['shipping_address'],
                'phone_number' => $validated['phone_number'],
                'pincode' => $validated['pincode'],
                'payment_method' => $validated['payment_method'],
            ]);

            foreach ($itemsToCreate as $itemData) {
                $order->items()->create($itemData);
            }

            return redirect()->route('orders.track', $order->id);
        });
    }
}
