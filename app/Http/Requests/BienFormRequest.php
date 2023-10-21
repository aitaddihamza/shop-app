<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BienFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:3'],
            'price' => ['required', 'numeric'],
            'description' => ['required', 'string', 'min:3'],
            'image' => ['nullable', 'mimes:png,jpg,jpeg', 'max:3000', 'min:0'],
            'model' => ['required', 'numeric']
        ];
    }
}
