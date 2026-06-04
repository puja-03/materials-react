<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $role = $request->input('role');
        $kyc = $request->input('kyc');

        $users = User::with('wallet')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('id', 'like', "%{$search}%");
                });
            })
            ->when($role, function ($query, $role) {
                $query->where('role', $role);
            })
            ->when($kyc, function ($query, $kyc) {
                $query->where('kyc_status', $kyc);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $stats = [
            'total_users' => User::count(),
            'active_shops' => User::where('role', 'shopkeeper')->count(),
            'pending_verifications' => User::where('kyc_status', 'pending')->count(),
            'monthly_revenue' => Order::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->where('status', '!=', 'cancelled')
                ->sum('total_amount'),
        ];

        return Inertia::render('admin/users', [
            'users' => $users,
            'stats' => $stats,
            'filters' => $request->only(['search', 'role', 'kyc']),
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:admin,shopkeeper,client',
        ]);

        $user->update(['role' => $request->role]);

        return back()->with('success', "Role updated for {$user->name} to {$request->role}.");
    }

    public function updateKycStatus(Request $request, User $user)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $user->update(['kyc_status' => $request->status]);

        return back()->with('success', "KYC status for {$user->name} updated to {$request->status}.");
    }

    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();

        return back()->with('success', "User {$name} deleted.");
    }
}
