<?php

namespace App\Queries;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserQueries
{
    /**
     * Get a paginated list of users.
     */
    public function getPaginatedUsers(int $page = 1, int $perPage = 10, ?string $sort = null, string $order = 'asc'): LengthAwarePaginator
    {
        $query = User::with('accessLevel');

        if ($sort) {
            if (str_contains($sort, '.')) {
                $query->sortByRelation($sort, $order);
            } else {
                $query->orderBy($sort, $order);
            }
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }
}
