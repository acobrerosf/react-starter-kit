<?php

return [

    /*
    |--------------------------------------------------------------------------
    | ACL
    |--------------------------------------------------------------------------
    |
    | This file is for defining the access levels, roles and permissions for
    | the application.
    |
    */

    'guardAccessLevels' => [
        'admin' => [
            \App\Models\UserAccessLevel::FULL_ADMINISTRATOR => [
                'adminUserCommon',
                'usersManagement',
            ],
        ],
    ],

    'roles' => [
        'adminUserCommon' => [
            'dashboard',
            'profile.edit',
            'profile.update',
            'password.edit',
            'password.update',
            'appearance',
        ],
        'usersManagement' => [
            'users.index',
            'users.create',
            'users.store',
            'users.edit',
            'users.update',
            'users.destroy',
        ],
    ],
];
