<?php

namespace App\Repositories\Subscriber;

use LaravelEasyRepository\Repository;

interface SubscriberRepository extends Repository{

    public function all();
}
