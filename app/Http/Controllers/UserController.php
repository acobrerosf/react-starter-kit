<?php

namespace App\Http\Controllers;

use App\Http\Requests\DatatableRequest;
use App\Queries\UserQueries;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class UserController extends Controller
{
    /**
     * Show the list of users
     */
    public function index(DatatableRequest $request, UserQueries $userQueries): InertiaResponse
    {
        $users = $userQueries->getPaginatedUsers(
            $request->getPage(),
            $request->getPerPage(),
            $request->getSort(),
            $request->getOrder(),
            $request->getFilter()
        );

        return Inertia::render('users/index', [
            'users' => $users->items(),
            'currentPage' => $users->currentPage(),
            'perPage' => $users->perPage(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'sort' => $request->getSort(),
            'order' => $request->getOrder(),
            'filter' => $request->getFilter(),
        ]);
    }
}
