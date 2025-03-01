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
    ],
];
