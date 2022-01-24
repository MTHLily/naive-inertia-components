<?php

use App\Http\Controllers\DummyController;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */


Route::get('/', function () {

    $users = QueryBuilder::for(User::class)
        ->allowedSorts('name', 'id', 'created_at')
        ->allowedFilters(['name', 'id', AllowedFilter::callback('created_at', function (Builder $query, $value) {
            $query->whereBetween('created_at', $value);
        })])
        ->paginate(request()->query('page_perPage', 15), '*');

    return Inertia::render('Welcome', [
        'users' => $users,
    ]);
})->name('home');

Route::get('/users', [DummyController::class, 'getUsers']);

require __DIR__ . '/auth.php';
