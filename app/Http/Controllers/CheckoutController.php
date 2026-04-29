<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Services\WalletService;

class CheckoutController extends Controller
{
    public function __construct(protected WalletService $walletService) {}

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

            $user = Auth::user() ?? User::find(1); // Fallback for demo

            if ($validated['payment_method'] === 'wallet' && $user->wallet->balance < $totalAmount) {
                return back()->withErrors(['wallet' => 'Insufficient wallet balance.']);
            }

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => $validated['payment_method'] === 'wallet' ? 'paid' : 'pending',
                'shipping_address' => $validated['shipping_address'],
                'phone_number' => $validated['phone_number'],
                'pincode' => $validated['pincode'],
                'payment_method' => $validated['payment_method'],
            ]);

            foreach ($itemsToCreate as $itemData) {
                $order->items()->create($itemData);
            }

            // Split payment between Admin and Seller
            if ($order->status === 'paid') {
                $this->walletService->processOrderPayment($order);
            }

            return redirect()->route('orders.track', $order->id);
        });
    }
}
