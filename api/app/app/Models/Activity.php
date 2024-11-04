<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $casts = [
        'read_flag' => 'boolean',
    ];

    protected $fillable = [
        'message_id',
        'read_flag',
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
