<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class UserController extends Controller
{
    /**
     * Show the list of users
     */
    public function index(Request $request): InertiaResponse
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);

        $users = User::with('accessLevel')
            ->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('users/index', [
            'users' => $users->items(),
        ]);
    }
}
