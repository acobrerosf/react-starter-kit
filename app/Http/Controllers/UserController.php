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
        $sort = $request->input('sort');
        $order = $request->input('order', 'asc');

        $query = User::with('accessLevel');

        if ($sort) {
            if (str_contains($sort, '.')) {
                $query->sortByRelation($sort, $order);
            } else {
                $query->orderBy($sort, $order);
            }
        }

        $users = $query->paginate($perPage, ['*'], 'page', $page);

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
