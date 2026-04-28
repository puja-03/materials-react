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
            'products' => Product::with('category')->get(),
            'categories' => Category::all(),
        ]);
    }
}
