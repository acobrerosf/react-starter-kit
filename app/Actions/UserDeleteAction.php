<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserDeleteAction
{
    /**
     * Delete a user.
     */
    public function handle(User $user): void
    {
        DB::transaction(function () use ($user) {
            // Update email so it can be used by new user
            $user->email = $user->email.'#'.$user->id;
            $user->save();

            // Delete user's password reset tokens
            DB::table('user_password_reset_tokens')
                ->where('email', $user->email)
                ->delete();

            // Delete user
            $user->delete();
        });
    }
}
