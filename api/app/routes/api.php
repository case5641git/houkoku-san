<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\ReportController;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Events\MessageCreated;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::post('/register', [AuthController::class, 'register'])->name('register');
    });
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/auth'
], function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/profile/edit', [AuthController::class, 'update'])->name('profile.edit');
    Route::post('unsubscribe', [AuthController::class, 'unsubscribe'])->name('unsubscribe');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('me', [AuthController::class, "me"])->name('me');
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::post('reports', [ReportController::class, 'add'])->name('reports.add');
    Route::get('reports/{report_id}', [ReportController::class, 'showDetail'])->name('reports.show_detail');
    Route::get('messages/{report_id}', [MessageController::class, 'showMessages'])->name('show_messages');
    Route::post('send-message', [MessageController::class, 'sendMessage'])->name('send_message');
});