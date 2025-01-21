<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $keyType = 'int';
    public $incrementing = true;
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y/m/d H:i');
    }

    protected $casts = [
        'user_id' => 'string',
        'manager_id' => 'string',
        'reserver_num' => 'integer',
        'visitor_num' => 'integer',
        'reserver_contractor_num' => 'integer',
        'visitor_contractor_num' => 'integer',
        'sales' => 'integer',
        'customer_feedback' => 'string',
        'crew_feedback' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $fillable = [
        'user_id',
        'manager_id',
        'reserver_num',
        'visitor_num',
        'reserver_contractor_num',
        'visitor_contractor_num',
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
