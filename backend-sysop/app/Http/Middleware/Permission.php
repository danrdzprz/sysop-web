<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\Role;

class Permission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, String ...$params): Response
    {
        if(auth()->user() && auth()->user()->role){
            $role = auth()->user()->role;
            $access=$role->permissions ? $role->permissions : (Object)[];
            if(! (property_exists($access, 'root') && $role->permissions->root ) ){
              if ($role ) {
                foreach($params as $key){
                  if(property_exists($access, $key)){
                    $access=$access->{$key};
                    if($access===false){
                      throw new AuthorizationException( __('api.common.permissions.denied'), 1);
                    }
                  }
                  else{
                    throw new AuthorizationException( __('api.common.permissions.denied'), 1);
                  }
                }
              }
              else{
                throw new AuthorizationException( __('api.common.permissions.denied'), 1);
              }
            }
          }
          else{
            throw new AuthorizationException( __('api.common.permissions.denied'), 1);
          }
          return $next($request);
        // return $next($request);
    }
}
