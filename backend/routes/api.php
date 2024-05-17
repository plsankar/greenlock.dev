<?php

use App\Http\Controllers\AcmeOrderController;
use Illuminate\Support\Facades\Route;

Route::post('/order', [AcmeOrderController::class, 'create']);
Route::post('/order/verify', [AcmeOrderController::class, 'verify']);

Route::get('/', function () {
	return ['Laravel' => app()->version()];
});
