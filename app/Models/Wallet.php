<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = ['owner_id', 'owner_type', 'balance'];

    public function owner()
    {
        return $this->morphTo();
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function deposit($amount, $description = null, $referenceId = null)
    {
        return DB::transaction(function () use ($amount, $description, $referenceId) {
            $this->increment('balance', $amount);
            return $this->transactions()->create([
                'amount' => $amount,
                'type' => 'credit',
                'description' => $description,
                'reference_id' => $referenceId,
                'status' => 'completed',
            ]);
        });
    }

    public function withdraw($amount, $description = null, $referenceId = null)
    {
        if ($this->balance < $amount) {
            throw new \Exception('Insufficient balance');
        }

        return DB::transaction(function () use ($amount, $description, $referenceId) {
            $this->decrement('balance', $amount);
            return $this->transactions()->create([
                'amount' => $amount,
                'type' => 'debit',
                'description' => $description,
                'reference_id' => $referenceId,
                'status' => 'completed',
            ]);
        });
    }
}
