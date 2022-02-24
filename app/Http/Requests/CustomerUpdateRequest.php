<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerUpdateRequest extends FormRequest
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
            'name' => ['string', 'required'],
            'address' => ['string', 'required'],
            'email' => [
                'required', 'string', 'email', Rule::unique('customers', 'email')->ignore($this->customer)
            ],
            'phone' => [
                'required', 'string', Rule::unique('customers', 'phone')->ignore($this->customer)
            ],
        ];
    }
}
