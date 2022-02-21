<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:products|string',
            'category_id' => 'required|numeric',
            'modelCode' => 'string|nullable|unique:products',
            'barcode' => 'string|nullable|unique:products',
            'brand' => 'string|nullable',
            'image' => 'string|nullable',
            'description' => 'string|nullable',
            'buyingPrice' => 'numeric|nullable',
            'sellingPrice' => 'numeric|nullable',
            'taxPrice' => 'numeric|nullable',
            'discount' => 'numeric|nullable',
            'quantity' => 'numeric|nullable',
        ];
    }
}
