<?php

namespace App\Http\Controllers;

use App\Actions\UserSaveAction;
use App\Http\Requests\DatatableRequest;
use App\Http\Requests\UserStoreRequest;
use App\Models\UserAccessLevel;
use App\Queries\UserQueries;
use Illuminate\Http\RedirectResponse;
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
     * Store the user.
     */
    public function store(UserStoreRequest $request, UserSaveAction $action): RedirectResponse
    {
        $user = $action->handle($request->validated());

        return redirect()->route('users.edit', $user->id)
            ->with('success', 'User created successfully');
    }

    /**
     * Load related lists.
     */
    private function loadRelatedLists(array $data = []): array
    {
        return [
            ...$data,
            'accessLevels' => UserAccessLevel::orderBy('id')->get(),
        ];
    }
}
