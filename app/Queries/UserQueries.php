<?php

namespace App\Queries;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserQueries
{
    /**
     * Get a paginated list of users.
     */
    public function getPaginatedUsers(int $page = 1, int $perPage = 10, ?string $sort = null, string $order = 'asc', ?string $filter = ''): LengthAwarePaginator
    {
        $query = User::with('accessLevel');

        if (! empty($filter)) {
            $query->where(function ($q) use ($filter) {
                $q->where('name', 'like', "%{$filter}%")
                    ->orWhere('email', 'like', "%{$filter}%")
                    ->orWhereHas('accessLevel', function ($q) use ($filter) {
                        $q->where('name', 'like', "%{$filter}%");
                    });
            });
        }

        if ($sort && $order) {
            $query->orderBy($sort, $order);
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }
}
