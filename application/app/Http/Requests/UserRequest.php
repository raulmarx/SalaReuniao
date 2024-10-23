<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Get the custom validation messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'O nome do usuário é obrigatório.',
            'email.required' => 'O email do usuário é obrigatório.',
            'email.email' => 'O email do usuário deve ser um email válido.',
            'email.unique' => 'O email do usuário já existe.',
            'password.required' => 'A senha do usuário é obrigatória.',
            'password.min' => 'A senha do usuário deve ter ao menos 8 caracteres.',
            'password.confirmed' => 'A senha do usuário não confere.',
        ];
    }
}
