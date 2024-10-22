<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(
            \App\Repositories\ReserveRepositoryInterface::class,
            \App\Repositories\ReserveEloquentRepository::class
        );
        $this->app->bind(
            \App\Repositories\RoomRepositoryInterface::class, 
            \App\Repositories\RoomEloquentRepository::class
        );
    }
}
