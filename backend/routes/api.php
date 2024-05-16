<?php

use App\Http\Controllers\AcmeOrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/order', [AcmeOrderController::class, 'create']);
