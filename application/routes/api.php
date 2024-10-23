<?php

use App\Http\Controllers\API\ReserveController;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [UsersController::class, 'register'])->name('register');

Route::post('login', [UsersController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [UsersController::class, 'logout'])->name('logout');
    Route::get('me', [UsersController::class, 'me'])->name('me');
    Route::get('roomsnotinuser', [RoomController::class, 'roomsNotInUser'])->name('roomsnotinuser');
    Route::apiResource('rooms', RoomController::class);
    Route::apiResource('reserves', ReserveController::class);
    
});
