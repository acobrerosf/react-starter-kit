<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSaveAction
{
    /**
     * Save a user and send a reset password email if the user is newly created.
     */
    public function handle(array $data, ?User $user = null): User
    {
        DB::beginTransaction();

        try {
            $recentlyCreated = false;

            if (! $user) {
                $user = new User;
                $user->password = bcrypt(Str::random(10));
                $recentlyCreated = true;
            }

            $user->fill($data);
            $user->save();

            if ($recentlyCreated) {
                $token = Str::random(64);

                // Create reset password token
                DB::table(config('auth.passwords.users.table'))->insert([
                    'email' => $user->email,
                    'token' => $token,
                    'created_at' => now(),
                ]);

                // Send reset password email
                $user->sendPasswordResetNotification($token);
            }

            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
