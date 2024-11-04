<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'manager_id',
        'reserver_num',
        'visitor_num',
        'sales',
        'customer_feedback',
        'crew_feedback',
    ];
}
