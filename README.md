# THIS PACKAGE IS STILL WIP, INCLUDING THIS README

# Installation

Use your package manager to install this package.

```
    npm install naive-inertia-components
```

Naive Inertia Components were meant for use in an InertiaJS application. Please ensure you have the following packages installed:

1. InertiaJS
2. InertiaJS Vue
3. Ziggy
4. Naive UI

# Components

## Pagination

### NInertiaPagination

#### Props

- pagination-data
  Laravel pagination.

## Data Tables

### NInertiaDataTable

#### Props

- pagination-data
  See [NInertiaPagination](#NInteriaTable)
- columns
  Extension of the Naive UI DataTableColumn type.

  ```typescript
  DataTableColumn & {
    sorter: boolean; // Set to true if you want to enable sorting for this column.
    filterType: "text" | "daterange" | "check"; // Set to either to enable filtering for the column
  }
  ```

  For more details, [refer to Naive UI DataTable.](https://www.naiveui.com/en-US/os-theme/components/data-table#API)

### Filtering and Sorting

Naive Inertia Components bases its filtering and sorting on Spatie Laravel Query Builder package.

##### <b>Filtering</b>

`?filter[name]=name&filter[email]=example@example@.com`

#### <b>Sorting</b>

`?sort=name`

As of now, only single sorts are impemented.

# Interfaces

## Laravel Pagination

## LaravelDataTableColumns<T>
