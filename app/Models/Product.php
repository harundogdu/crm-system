<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Product extends Model
{
    use HasFactory;

    protected $guarded = []; 

    protected function serializeDate(\DateTimeInterface $date)
    {
        return Carbon::parse($date)->diffForHumans();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
