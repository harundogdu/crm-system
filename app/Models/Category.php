<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $this->asDateTime($date)->format('Y-m-d H:i:s');
        // return Carbon::parse($date)->diffForHumans();
    }

}
