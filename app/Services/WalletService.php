<?php

namespace App\Services;

use App\Models\User;
use App\Models\Order;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class WalletService
{
    /**
     * Process order payment and split commission.
     */
    public function processOrderPayment(Order $order)
    {
        return DB::transaction(function () use ($order) {
            $user = $order->user;
            $totalAmount = $order->total_amount;

            // 1. Deduct from User Wallet if payment method is wallet
            if ($order->payment_method === 'wallet') {
                $user->wallet->withdraw($totalAmount, "Payment for Order #{$order->id}", $order->id);
            }

            // 2. Calculate Split (5% Admin, 95% Seller)
            $adminCommission = $totalAmount * 0.05;
            $sellerAmount = $totalAmount * 0.95;

            $order->update([
                'admin_commission_amount' => $adminCommission,
                'seller_amount' => $sellerAmount,
            ]);

            // 3. Credit Admin Wallet
            $admin = User::where('role', 'admin')->first();
            if ($admin) {
                $admin->wallet->deposit($adminCommission, "Commission from Order #{$order->id}", $order->id);
            }

            // 4. Credit Seller Wallet
            // Note: For simplicity, we assume one seller per order for now.
            // In a real multi-vendor, we'd loop through items.
            $firstItem = $order->items()->first();
            if ($firstItem && $firstItem->product && $firstItem->product->seller) {
                $seller = $firstItem->product->seller;
                $seller->wallet->deposit($sellerAmount, "Earnings from Order #{$order->id}", $order->id);
            }

            return $order;
        });
    }

    /**
     * Refund an order to the user's wallet.
     */
    public function refundOrder(Order $order)
    {
        return DB::transaction(function () use ($order) {
            if ($order->status === 'refunded') {
                return $order;
            }

            $user = $order->user;
            $user->wallet->deposit($order->total_amount, "Refund for Order #{$order->id}", $order->id);

            // Deduct from Admin and Seller wallets as well?
            // Usually, yes.
            $admin = User::where('role', 'admin')->first();
            if ($admin && $order->admin_commission_amount > 0) {
                $admin->wallet->withdraw($order->admin_commission_amount, "Refund reversal for Order #{$order->id}", $order->id);
            }

            $firstItem = $order->items()->first();
            if ($firstItem && $firstItem->product && $firstItem->product->seller && $order->seller_amount > 0) {
                $seller = $firstItem->product->seller;
                $seller->wallet->withdraw($order->seller_amount, "Refund reversal for Order #{$order->id}", $order->id);
            }

            $order->update(['status' => 'refunded']);

            return $order;
        });
    }
}
