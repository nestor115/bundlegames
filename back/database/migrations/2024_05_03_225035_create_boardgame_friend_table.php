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
        Schema::create('boardgame_friend', function (Blueprint $table) {
            $table->unsignedBigInteger('boardgame_id');
            $table->unsignedBigInteger('friend_id');
            $table->timestamps();
            
            // Definir las claves primarias compuestas
            $table->primary(['boardgame_id', 'friend_id']);
            
            // Definir las claves externas
            $table->foreign('boardgame_id')->references('id')->on('boardgames')->onDelete('cascade');
            $table->foreign('friend_id')->references('id')->on('friends')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boardgame_friend');
    }
};
