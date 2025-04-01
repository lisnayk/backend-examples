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
        $this->app->bind(
            \App\Services\Subscriber\SubscriberService::class,
            \App\Services\Subscriber\SubscriberServiceImplement::class
        );
        $this->app->bind(
            \App\Repositories\Subscriber\SubscriberRepository::class,
            \App\Repositories\Subscriber\SubscriberRepositoryImplement::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
