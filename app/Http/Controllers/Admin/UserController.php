<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/users', [
            'users' => User::latest()->get(),
            'total_users' => User::count(),
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
}
