<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Permission
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, \Closure $next, string ...$params): Response
    {
        if (auth()->user() && auth()->user()->role) {
            $role = auth()->user()->role;
            $access = $role->permissions ? $role->permissions : (object) [];
            if (!(property_exists($access, 'root') && $role->permissions->root)) {
                foreach ($params as $key) {
                    if (property_exists($access, $key)) {
                        $access = $access->{$key};
                        if (false === $access) {
                            throw new AuthorizationException(__('api.common.permissions.denied'), 1);
                        }
                    } else {
                        throw new AuthorizationException(__('api.common.permissions.denied'), 1);
                    }
                }
            }
        } else {
            throw new AuthorizationException(__('api.common.permissions.denied'), 1);
        }

        return $next($request);
    }
}
