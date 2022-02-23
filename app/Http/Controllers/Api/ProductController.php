<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::with('category')->orderByDesc('created_at')->get();

        return response()->json([
            'success' => true,
            'data' => $products
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        try {
            $all = $request->all();
            $image = (isset($all['image'])) ? $all['image'] : null;

            if ($image) {
                $image = $request->file('image');
                $fileName = 'image_' . time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('/uploads/images/'), $fileName);
                $all['image'] = $fileName;
            }
            $all['user_id'] = auth()->user()->id;
            $product = Product::create($all);

            return response()->json([
                'success' => true,
                'message' => "Product created successfully",
                'data' => $product
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json([
                'success' => true,
                'message' => "Product found successfully",
                'data' => $product
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductUpdateRequest $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $input = $request->all();

            if ($request->image) {
                if ($product->image) {
                    if (file_exists(public_path('uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR .  $product->image))) {
                        unlink(public_path('uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR .  $product->image));
                    }
                }
                $image = $request->file('image');
                $fileName = 'image_' . time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR), $fileName);
                $input['image'] = $fileName;
            }
            $input['user_id'] = auth()->user()->id;
            $product->update($input);

            return response()->json([
                'success' => true,
                'message' => "Product updated successfully",
                'data' => $product
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $image = $product->image;

            if ($image) {
                if (file_exists(public_path('/uploads/images/' . $image))) {
                    unlink(public_path('/uploads/images/' . $image));
                }
            }

            $product->delete();
            return response()->json([
                'success' => true,
                'message' => "Product deleted successfully",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }
}
