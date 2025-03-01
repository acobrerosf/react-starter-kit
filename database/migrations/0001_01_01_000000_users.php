<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_access_levels', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->string('name')->unique();
        });
        DB::table('user_access_levels')->insert([
            ['id' => 1, 'name' => 'Full Administrator'],
        ]);

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_level_id')->constrained('user_access_levels')->cascadeOnUpdate();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('user_password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_password_reset_tokens');
        Schema::dropIfExists('users');
        Schema::dropIfExists('user_access_levels');
    }
};
