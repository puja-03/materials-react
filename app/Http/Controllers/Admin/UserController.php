<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::when($search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })->latest()->get();

        return Inertia::render('admin/users', [
            'users' => $users,
            'total_users' => User::count(),
            'filters' => $request->only(['search']),
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
}
