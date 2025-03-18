<?php

namespace App\Http\Controllers;

use App\Http\Requests\DatatableRequest;
use App\Models\UserAccessLevel;
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

    /**
     * Show the create form.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('users/create', $this->loadRelatedLists());
    }

    /**
     * Show the invite form.
     */
    public function invite(): InertiaResponse
    {
        return Inertia::render('users/invite', $this->loadRelatedLists());
    }

    /**
     * Load related lists.
     */
    private function loadRelatedLists(array $data = []): array
    {
        return [
            ...$data,
            'access_levels' => UserAccessLevel::orderBy('id')->get(),
        ];
    }
}
