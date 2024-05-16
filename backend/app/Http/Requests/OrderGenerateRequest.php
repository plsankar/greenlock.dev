<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AcmeOrderGenerateRequest extends FormRequest
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
            'domains' => 'required|array',
            'domains.*' => 'string',
            'email' => 'required|email',
            'type' => 'in:https,dns',
        ];
    }

    /**
     * The function prepares input data for validation by converting a comma-separated string into an
     * array.
     */
    protected function prepareForValidation(): void
    {
        if (isset($this->domains) && !empty($this->domains)) {
            $this->merge([
                'domains' => explode(',', $this->domains),
            ]);
        }
    }
}
