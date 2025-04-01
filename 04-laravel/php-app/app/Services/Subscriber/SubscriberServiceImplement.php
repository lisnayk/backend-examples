<?php

namespace App\Services\Subscriber;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Subscriber\SubscriberRepository;

class SubscriberServiceImplement extends ServiceApi implements SubscriberService{

    /**
     * set title message api for CRUD
     * @param string $title
     */
     protected string $title = "";
     /**
     * uncomment this to override the default message
     * protected string $create_message = "";
     * protected string $update_message = "";
     * protected string $delete_message = "";
     */

     /**
     * don't change $this->mainRepository variable name
     * because used in extends service class
     */
     protected SubscriberRepository $mainRepository;

    public function __construct(SubscriberRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    public function all()
    {
        return $this->mainRepository->all();
    }
}
