<?php

namespace App\Http\Controllers;

use App\Queries\UserQueries;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class UserController extends Controller
{
    /**
     * Show the list of users
     */
    public function index(Request $request, UserQueries $userQueries): InertiaResponse
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $sort = $request->input('sort');
        $order = $request->input('order', 'asc');

        $users = $userQueries->getPaginatedUsers($page, $perPage, $sort, $order);

        return Inertia::render('users/index', [
            'users' => $users->items(),
            'currentPage' => $users->currentPage(),
            'perPage' => $users->perPage(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'sort' => $sort,
            'order' => $order,
        ]);
    }
}
