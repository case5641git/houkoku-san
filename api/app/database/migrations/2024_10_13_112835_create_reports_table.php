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
            $table->unsignedBigInteger('id', true)->comment('報告書ID');
            $table->unsignedBigInteger('user_id')->comment('報告者ID');
            $table->unsignedBigInteger('manager_id')->comment('報告先ID');
            $table->unsignedBigInteger('reserver_num')->comment('予約者数');
            $table->unsignedBigInteger('visitor_num')->comment('飛込来店数');
            $table->bigInteger('sales')->comment('売上');
            $table->text('customer_feedback',1000)->comment('お客様ご意見');
            $table->text('crew_feedback',1000)->comment('店長フィードバック');
            $table->datetime('created_at')->nullable()->comment('作成日時');
            $table->datetime('updated_at')->nullable()->comment('更新日時');
            $table->datetime('deleted_at')->nullable()->comment('削除日時');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
