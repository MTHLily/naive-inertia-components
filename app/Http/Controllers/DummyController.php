<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DummyController extends Controller
{
    public function getUsers()
    {

    $users = User::paginate(15);

    return response()->json($users);
    }
}
