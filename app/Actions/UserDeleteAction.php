<?php

namespace App\Actions;

use App\Models\User;

class UserDeleteAction
{
    /**
     * Delete a user.
     */
    public function handle(User $user): void
    {
        // Update email so it can be used by new user
        $user->email = $user->email.'#'.$user->id;
        $user->save();

        // Delete user
        $user->delete();
    }
}
