<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('subscriber_subscription', function (Blueprint $table) {
            $table->unsignedBigInteger("subscription_id");
            $table->unsignedBigInteger("subscriber_id");
            $table->foreign('subscription_id')->references('id')->on('subscriptions')
                ->onDelete('cascade');
            $table->foreign('subscriber_id')->references('id')->on('subscribers')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
