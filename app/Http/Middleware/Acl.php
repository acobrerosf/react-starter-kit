<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Acl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ?string $guard = null): Response
    {
        if (! $this->userHasPermission($request, $guard)) {
            abort(403, 'Access denied');
        }

        return $next($request);
    }

    /**
     * Check if the user has the permission to access the resource.
     */
    protected function userHasPermission(Request $request, ?string $guard = null): bool
    {
        $user = $request->user($guard);
        if (! $user) {
            return false;
        }

        $guard ??= config('auth.defaults.guard');
        $accessLevel = $user->access_level_id;
        $roles = config('acl.guardAccessLevels.'.$guard.'.'.$accessLevel);
        if (! $roles || ! is_array($roles)) {
            return false;
        }

        $routeName = $request->route()->getName();
        if (! $routeName) {
            return false;
        }

        foreach ($roles as $role) {
            $permissions = config('acl.roles.'.$role);
            if (! $permissions || ! is_array($permissions)) {
                continue;
            }

            if (in_array($routeName, $permissions)) {
                return true;
            }
        }

        return false;
    }
}
