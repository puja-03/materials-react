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
        return Inertia::render('products/index', [
            'products' => Product::with('category')->latest()->get(),
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url',
        ]);

        $product->update($validated);

        return redirect()->route('dashboard')->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('dashboard')->with('success', 'Product removed from marketplace.');
    }
}
