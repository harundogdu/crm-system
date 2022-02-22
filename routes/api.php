<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/v1')->name('v1.')->group(function () {

    /* NOT Authenticated */
    Route::prefix('/auth')->name('auth.')->group(function () {
        Route::post('/login')->name('login')->uses(AuthController::class . '@login');
        Route::post('/register')->name('register')->uses(AuthController::class . '@register');
    });

    /* Authenticated */
    Route::middleware('auth:api')->group(function () {

        Route::prefix('/auth')->name('auth.')->group(function () {
            Route::post('/logout')->name('logout')->uses(AuthController::class . '@logout');
            Route::post('/user')->name('user')->uses(AuthController::class . '@user');
            Route::post('/authenticate')->name('authenticate')->uses(AuthController::class . '@authenticate');
        });


        Route::apiResources([
            'products' => ProductController::class,
            'categories' => CategoryController::class,
        ]);

    });
});
