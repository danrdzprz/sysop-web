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
        Route::get('/', [PostController::class, 'index'])->middleware('permission:posts,read');
        // POST api/posts
        Route::post('/', [PostController::class, 'store'])->middleware('permission:posts,create');
        // PUT api/posts/:post
        Route::get('{post}', [PostController::class, 'show'])->middleware('permission:posts,read');
        // PUT api/posts/:post
        Route::put('{post}', [PostController::class, 'update'])->middleware('permission:posts,update');
        // DELETE api/posts/:post
        Route::delete('{post}', [PostController::class, 'destroy'])->middleware('permission:posts,delete');
    });

    // GROUP api/users
    Route::group(['prefix' => 'users'], function () {
        // GET api/users
        Route::get('/', [UserController::class, 'index'])->middleware('permission:users,read');
        // POST api/users
        Route::post('/', [UserController::class, 'store'])->middleware('permission:users,create');
        // PUT api/users/:user
        Route::get('{user}', [UserController::class, 'show'])->middleware('permission:users,read');
        // PUT api/users/:user
        Route::put('{user}', [UserController::class, 'update'])->middleware('permission:users,update');
        // DELETE api/users/:user
        Route::delete('{user}', [UserController::class, 'destroy'])->middleware('permission:users,delete');
    });
});
