<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Post\PostController;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// GET api/login
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // POST api/logout
    Route::post('logout', [AuthController::class, 'logout']);
    // GROUP api/posts
    Route::group(['prefix' => 'posts'], function () {
        // GET api/posts
        Route::get('/', [PostController::class, 'index']);
        // POST api/posts
        Route::post('/', [PostController::class, 'store']);
        // PUT api/posts/:post
        Route::get('{post}', [PostController::class, 'show']);
        // PUT api/posts/:post
        Route::put('{post}', [PostController::class, 'update']);
        // DELETE api/posts/:post
        Route::delete('{post}', [PostController::class, 'destroy']);
    });

    // GROUP api/users
    Route::group(['prefix' => 'users'], function () {
        // GET api/users
        Route::get('/', [UserController::class, 'index']);
        // POST api/users
        Route::post('/', [UserController::class, 'store']);
        // PUT api/users/:user
        Route::get('{user}', [UserController::class, 'show']);
        // PUT api/users/:user
        Route::put('{user}', [UserController::class, 'update']);
        // DELETE api/users/:user
        Route::delete('{user}', [UserController::class, 'destroy']);
    });
});
