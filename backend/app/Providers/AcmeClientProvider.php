<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;
use Afosto\Acme\Client;
use League\Flysystem\Filesystem;
use League\Flysystem\Local\LocalFilesystemAdapter;

class AcmeClientProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Client::class, function (Application $app, array $params) {

            $email = $params['email'];

            $adapter = new LocalFilesystemAdapter(base_path() . '/data/ssl-certs/');
            $filesystem = new Filesystem($adapter);

            $client = new Client([
                'username' => $email,
                'fs' => $filesystem,
                'mode'     => Client::MODE_LIVE,
            ]);

            return $client;
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array<int, string>
     */
    public function provides(): array
    {
        return [Client::class];
    }
}
