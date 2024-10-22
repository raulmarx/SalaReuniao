<?php 
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReserveRequest extends FormRequest
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
        $rules = [
            'room_id' => 'required|exists:rooms,id',
            'responsible' => 'required|string|max:255',
            'start_reservation' => 'required|date|after:now',
            'end_reservation' => 'required|date|after:start_reservation',
        ];

        
        if ($this->isMethod('put') || $this->isMethod('patch')) {            
            $rules['start_reservation'] = 'required|date';            
        }

        return $rules;
    }

    /**
     * Get the custom validation messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'room_id.required' => 'A sala é obrigatória.',
            'room_id.exists' => 'A sala selecionada não existe.',
            'responsible.required' => 'O nome do responsável é obrigatório.',
            'start_reservation.required' => 'A data e hora de início são obrigatórias.',
            'start_reservation.after' => 'A data e hora de início devem ser futuras.',
            'end_reservation.required' => 'A data e hora de término são obrigatórias.',
            'end_reservation.after' => 'A data e hora de término devem ser após a data de início.',
        ];
    }
}
