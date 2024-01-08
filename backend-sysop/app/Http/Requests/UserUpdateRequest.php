<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,'.$this->user->id,
            'birthdate' => 'nullable|date_format:Y-m-d',
            'phone' => 'nullable|numeric|min:10',
            'password' => 'nullable|string|confirmed|min:8',
            'role_id' => 'required|numeric|exists:roles,id',
        ];
    }
}
