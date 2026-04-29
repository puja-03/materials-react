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
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // The seller
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('admin_commission_amount', 12, 2)->default(0);
            $table->decimal('seller_amount', 12, 2)->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['admin_commission_amount', 'seller_amount']);
        });
    }
};
