<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $wallet = $user->wallet;
        $transactions = $wallet->transactions()
            ->latest()
            ->paginate(10);

        return Inertia::render('wallet/index', [
            'wallet' => $wallet,
            'transactions' => $transactions,
        ]);
    }

    public function addMoney(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = Auth::user();
        $user->wallet->deposit($request->amount, "Added money via payment gateway");

        return back()->with('success', "₹{$request->amount} added to your wallet.");
    }

    public function withdraw(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = Auth::user();
        
        try {
            $user->wallet->withdraw($request->amount, "Withdrawal request to bank account");
            return back()->with('success', "Withdrawal request for ₹{$request->amount} submitted.");
        } catch (\Exception $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }
    }
}
