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
            'Platform' => [
                [
                    'title' => 'Dashboard',
                    'href' => '/dashboard',
                    'icon' => 'LayoutGrid',
                ],
            ],
            'Configuration' => [
                [
                    'title' => 'Users',
                    'href' => '/users',
                    'icon' => 'Users',
                ],
            ],
        ],
    ],
];
