<?php

namespace Database\Seeders;

use App\Models\Subscriber;
use App\Models\Subscription;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Subscriber::factory()->count(100)->has(Subscription::factory()->count(3))->create();

    }
}
