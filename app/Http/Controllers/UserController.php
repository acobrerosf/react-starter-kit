<?php

namespace App\Http\Controllers;

use App\Actions\UserDeleteAction;
use App\Actions\UserSaveAction;
use App\Http\Requests\DatatableRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
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

        flashSuccessMessage('User created successfully');

        return redirect()->route('users.edit', $user->id);
    }

    /**
     * Show the edit form.
     */
    public function edit(User $user): InertiaResponse
    {
        return Inertia::render('users/edit', $this->loadRelatedLists([
            'user' => $user,
            'showDeleteButton' => $user->id !== auth()->user()->id,
        ]));
    }

    /**
     * Update the user.
     */
    public function update(UserUpdateRequest $request, User $user, UserSaveAction $action): RedirectResponse
    {
        $logoutUser = $user->id === auth()->user()->id &&
            $user->email !== $request->email;

        $user = $action->handle($request->validated(), $user);

        if ($logoutUser) {
            auth()->logout();
        }

        flashSuccessMessage('User updated successfully');

        return redirect()->route('users.edit', $user->id);
    }

    /**
     * Delete the user.
     */
    public function destroy(User $user, UserDeleteAction $action): RedirectResponse
    {
        if ($user->id === auth()->user()->id) {
            flashDangerMessage('You cannot delete your own account');

            return redirect()->route('users.edit', $user->id);
        }

        $action->handle($user);

        flashSuccessMessage('User deleted successfully');

        return redirect()->route('users.index');
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
