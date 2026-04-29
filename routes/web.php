<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\UserController;

use App\Http\Controllers\CheckoutController;

Route::get('products', [ProductController::class, 'index'])->name('products.index');
Route::inertia('cart', 'cart')->name('cart');
Route::post('checkout', [CheckoutController::class, 'store'])->name('checkout.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');
    Route::get('admin/users', [UserController::class, 'index'])->name('admin.users')->middleware('admin');
    Route::get('orders/{id}/track', [OrderController::class, 'show'])->name('orders.track');
});

require __DIR__.'/settings.php';
