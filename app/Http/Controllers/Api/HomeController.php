<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function index()
    {
        try {
            if (Cache::has('statistics')) {
                $statistics = Cache::get('statistics');
            } else {

                $mostPopularCategories = Category::withCount('products')
                    ->orderBy('products_count', 'desc')
                    ->orderBy('created_at', 'desc')
                    ->take(5)
                    ->get();

                $mostPopularProducts = Product::orderBy('created_at', 'desc')
                    ->take(10)
                    ->select(['name', 'created_at', 'quantity'])
                    ->get();

                $statistics = [
                    'users' => User::count(),
                    'products' => Product::count(),
                    'categories' => Category::count(),
                    'totalOperation' => 10,
                    'stock' => Product::sum('quantity'),
                    'unStock' => Product::where('quantity', 0)->count(),
                    'mostPopularCategories' => $mostPopularCategories,
                    'mostPopularProducts' => $mostPopularProducts,
                ];

                Cache::put('statistics', $statistics, 60);
            }


           /*  $endTime = now()->addMinutes(10);

            $statistics = Cache::remember('statistics', $endTime, function () {

                $mostPopularCategories = Category::withCount('products')
                    ->orderBy('products_count', 'desc')
                    ->orderBy('created_at', 'desc')
                    ->take(5)
                    ->get();

                $mostPopularProducts = Product::orderBy('created_at', 'desc')
                    ->take(10)
                    ->select(['name', 'created_at', 'quantity'])
                    ->get();

                return [
                    'users' => User::count(),
                    'products' => Product::count(),
                    'categories' => Category::count(),
                    'totalOperation' => 10,
                    'stock' => Product::sum('quantity'),
                    'unStock' => Product::where('quantity', 0)->count(),
                    'mostPopularCategories' => $mostPopularCategories,
                    'mostPopularProducts' => $mostPopularProducts,
                ];
            }); */

            return response()->json([
                'success' => true,
                'message' => 'Welcome to Laravel E-commerce API',
                'statistics' => $statistics,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Something went wrong. Please try again later.",
            ], 500);
        }
    }
}
