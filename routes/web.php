<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WalletController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'featuredProducts' => Product::with('category')->latest()->take(4)->get(),
    ]);
})->name('home');

Route::get('products', [ProductController::class, 'index'])->name('products.index');
Route::redirect('product', 'products');
Route::inertia('cart', 'cart')->name('cart');
Route::post('checkout', [CheckoutController::class, 'store'])->name('checkout.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');
    Route::get('products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::get('admin/users', [UserController::class, 'index'])->name('admin.users')->middleware('admin');
    Route::patch('admin/users/{user}/role', [UserController::class, 'updateRole'])->name('admin.users.role')->middleware('admin');
    Route::patch('admin/users/{user}/kyc-status', [UserController::class, 'updateKycStatus'])->name('admin.users.kyc')->middleware('admin');
    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{id}/track', [OrderController::class, 'show'])->name('orders.track');

    // Wallet Routes
    Route::get('wallet', [WalletController::class, 'index'])->name('wallet.index');
    Route::post('wallet/add', [WalletController::class, 'addMoney'])->name('wallet.add');
    Route::post('wallet/withdraw', [WalletController::class, 'withdraw'])->name('wallet.withdraw');
    // Admin Specific
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::patch('products/{product}/price', [ProductController::class, 'updatePrice'])->name('products.price');
        Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.status');
        Route::patch('orders/{order}/refund', [OrderController::class, 'refund'])->name('orders.refund');
    });
});

require __DIR__.'/settings.php';
