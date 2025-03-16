<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DatatableRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'page' => 'sometimes|integer|min:1',
            'perPage' => 'sometimes|integer|min:1|max:100',
            'sort' => 'sometimes|string',
            'order' => 'sometimes|string|in:asc,desc',
        ];
    }

    /**
     * Get the page number from the request.
     */
    public function getPage(): int
    {
        return (int) $this->input('page', 1);
    }

    /**
     * Get the per page count from the request.
     */
    public function getPerPage(): int
    {
        return (int) $this->input('perPage', 10);
    }

    /**
     * Get the sort column from the request.
     */
    public function getSort(): ?string
    {
        return $this->input('sort');
    }

    /**
     * Get the sort order from the request.
     */
    public function getOrder(): string
    {
        return $this->input('order', 'asc');
    }
}
