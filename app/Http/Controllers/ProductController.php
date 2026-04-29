<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $products = Product::with('category')
            ->when($user && $user->role === 'shopkeeper', fn ($q) => $q->where('user_id', $user->id))
            ->latest()
            ->get();

        return Inertia::render('products/index', [
            'products'   => $products,
            'categories' => Category::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('products/create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']) . '-' . rand(1000, 9999);
        $validated['vendor_name'] = auth()->user()->name;
        $validated['user_id'] = auth()->id();
        $validated['unit'] = 'pcs';

        Product::create($validated);

        return redirect()->route('dashboard')->with('success', 'Product listed successfully in marketplace!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url',
        ];

        // Only allow price update if user is admin
        if (auth()->user()->role === 'admin') {
            $rules['price'] = 'required|numeric|min:0';
        }

        $validated = $request->validate($rules);

        $product->update($validated);

        return redirect()->route('dashboard')->with('success', 'Product updated successfully!');
    }

    public function updatePrice(Request $request, Product $product)
    {
        $validated = $request->validate([
            'price' => 'required|numeric|min:0',
        ]);

        $product->update(['price' => $validated['price']]);

        return back()->with('success', 'Product price updated globally.');
    }

    public function destroy(Product $product)
    {
        // Check if user owns product or is admin
        if ($product->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        if ($product->orderItems()->exists()) {
            return back()->with('error', 'Cannot remove product that has existing orders. Consider updating stock to 0 instead.');
        }

        $product->delete();

        return redirect()->route('dashboard')->with('success', 'Product removed from marketplace.');
    }
}
