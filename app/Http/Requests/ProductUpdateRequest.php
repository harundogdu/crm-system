<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductUpdateRequest extends FormRequest
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
            'name' => [
                'required', 'string', Rule::unique('products')->ignore($this->product)
            ],
            'modelCode' => [
                'string', 'nullable', Rule::unique('products')->ignore($this->product)
            ],
            'barcode' => [
                'string', 'nullable', Rule::unique('products')->ignore($this->product)
            ],
            'category_id' => 'required|integer|exists:categories,id',
            'brand' => 'string|nullable',
            'description' => 'string|nullable',
            'buyingPrice' => 'numeric|nullable',
            'sellingPrice' => 'numeric|nullable',
            'taxPrice' => 'numeric|nullable',
            'discount' => 'numeric|nullable',
            'quantity' => 'numeric|nullable',
        ];
    }
}
