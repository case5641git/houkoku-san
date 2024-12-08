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
        Schema::create('reports', function (Blueprint $table) {
            $table->increments('id')->comment('報告書ID');
            $table->uuid('user_id')->comment('報告者ID');
            $table->uuid('manager_id')->comment('報告先ID');
            $table->unsignedBigInteger('reserver_num')->comment('予約者数');
            $table->unsignedBigInteger('visitor_num')->comment('飛込来店数');
            $table->bigInteger('sales')->comment('売上');
            $table->text('customer_feedback')->comment('お客様ご意見');
            $table->text('crew_feedback')->comment('店長フィードバック');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('manager_id')->references('id')->on('users')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('reports');
    }
};
