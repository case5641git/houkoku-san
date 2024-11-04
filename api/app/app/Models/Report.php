<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'user_id' => 'integer',
        'manager_id' => 'integer',
        'reserver_num' => 'integer',
        'visitor_num' => 'integer',
        'sales' => 'integer',
        'customer_feedback' => 'string',
        'crew_feedback' => 'string',
    ];

    protected $fillable = [
        'user_id',
        'manager_id',
        'reserver_num',
        'visitor_num',
        'sales',
        'customer_feedback',
        'crew_feedback',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
