<?php

/*
    |--------------------------------------------------------------------------
    | App response messages line
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by the api responses.
    |
    |
    |
    */

return [
    'common'=>[
        'permissions'=> [
            'denied' => 'Lo sentimos, acceso denegado'
        ]
    ],
    'auth' => [
        'login' => [
            'success' => 'Sesión cerrada correctamente.',
            'failure' => 'No autorizado',
        ],
        'logout' => [
            'success' => 'Inició de sesión correctamente.',
        ],
    ],
    'users' => [
        'create' => [
            'success' => 'Empleado registrado con éxito.',
        ],
        'update' => [
            'success' => 'Empleado actualizado con éxito.',
        ],
        'delete' => [
            'success' => 'Empleado eliminado con éxito.',
        ],
    ],
    'posts' => [
        'create' => [
            'success' => 'Publicación registrada exitosamente.',
        ],
        'update' => [
            'success' => 'Publicación actualizada exitosamente.',
        ],
        'delete' => [
            'success' => 'Publicación eliminada exitosamente.',
        ],
    ],
];
