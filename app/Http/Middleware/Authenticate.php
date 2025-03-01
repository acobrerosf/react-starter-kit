<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Handle an unauthenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return never
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function unauthenticated($request, array $guards)
    {
        $redirectTo = '/';
        foreach ($guards as $guard) {
            if ($login = config('auth.guards.'.$guard.'.login') ?? null) {
                $redirectTo = $login;
                break;
            }
        }

        throw new AuthenticationException(
            message: 'Unauthenticated.',
            guards: $guards,
            redirectTo: $redirectTo,
        );
    }
}
