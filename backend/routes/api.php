<?php

use App\Http\Controllers\AcmeOrderController;
use Illuminate\Support\Facades\Route;

Route::post('/order', [AcmeOrderController::class, 'create']);
Route::post('/order/verify', [AcmeOrderController::class, 'verify']);

Route::get('/', function () {
	return [
		'Laravel' => app()->version(),
		'env' => env('APP_ENV', 'production'),
		'APP_DEBUG' => env('APP_DEBUG', 'production'),
	];
});
