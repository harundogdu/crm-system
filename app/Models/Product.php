<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// use Illuminate\Support\Carbon;

class Product extends Model
{
    use HasFactory;

    protected $guarded = []; 

    protected function serializeDate(DateTimeInterface $date)
    {
        return $this->asDateTime($date)->format('Y-m-d H:i:s');
        // return Carbon::parse($date)->diffForHumans();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
