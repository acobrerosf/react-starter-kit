<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

trait HasSortableRelations
{
    /**
     * Apply sorting to a query based on a relation and column
     */
    public function scopeSortByRelation(Builder $query, string $relationSort, string $direction = 'asc'): Builder
    {
        // If no relation sort is provided, return the query as is
        if (empty($relationSort) || ! str_contains($relationSort, '.')) {
            return $query;
        }

        [$relation, $column] = explode('.', $relationSort);

        // Convert snake_case to camelCase for the relation name
        $camelCaseRelation = Str::camel($relation);

        // Get the related model's table name using the relationship
        $relatedModel = $this->$camelCaseRelation()->getRelated();
        $tableName = $relatedModel->getTable();

        // Get the foreign key from the relationship
        $foreignKey = $this->$camelCaseRelation()->getForeignKeyName();

        return $query->join($tableName, "{$this->getTable()}.{$foreignKey}", '=', "{$tableName}.id")
            ->orderBy("{$tableName}.{$column}", $direction)
            ->select("{$this->getTable()}.*"); // Ensure we only select from the main table
    }
}
