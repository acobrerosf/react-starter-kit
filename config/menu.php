<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Menu
    |--------------------------------------------------------------------------
    |
    | This file is for defining the menu for the application.
    |
    */

    'admin' => [
        \App\Models\UserAccessLevel::FULL_ADMINISTRATOR => [
            'en' => [
                'Platform' => [
                    [
                        'title' => 'Dashboard',
                        'url' => '/dashboard',
                        'icon' => 'LayoutGrid',
                    ],
                ],
            ],
            'es' => [
                'Aplicación' => [
                    [
                        'title' => 'Inicio',
                        'url' => '/dashboard',
                        'icon' => 'LayoutGrid',
                    ],
                ],
            ],
        ],
    ],
];
