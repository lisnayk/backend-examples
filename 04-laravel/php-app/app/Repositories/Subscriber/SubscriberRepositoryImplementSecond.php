<?php

namespace App\Repositories\Subscriber;

use App\Models\Subscriber;
use LaravelEasyRepository\Implementations\Eloquent;

class SubscriberRepositoryImplementSecond extends Eloquent implements SubscriberRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected Subscriber $model;

    public function __construct(Subscriber $model)
    {
        $this->model = $model;
    }

    public function all(): mixed
    {
        return $this->model->all();
    }
}
