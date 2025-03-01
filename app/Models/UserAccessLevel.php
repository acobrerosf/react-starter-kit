<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAccessLevel extends Model
{
    /**
     * Full Administrator (DB value).
     *
     * @var int
     */
    const FULL_ADMINISTRATOR = 1;
}
