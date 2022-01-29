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
  The Laravel pagination object. Insert it directly as a prop.

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

# Helpers

## useFormHelper

useFormHelper is a composable that currently contains two main functions:

### generateModelForm

Generates a helper function that makes an InertiaForm based on a model.

#### Usage

##### Generate the helper

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string | number;
  updated_at: string | number;
}

const { generateModelForm } = useFormHelper();

const toUserForm = generateModelForm<User>({
  simpleKeys: ["name", "email"],
  complexKeys: {
    created_at: {
      get: () => new Date.getTime(),
      set: (model) => new Date(model.created_at).getTime(),
    },
    updated_at: {
      get: () => new Date.getTime(),
    },
  },
});
```

##### Create form without model

```js
const form = toUserForm();

form = {
  name: null,
  email: null,
  created_at: 1642608000000,
  updated_at: 1642608000000,
};
```

##### Add fields not found in model

```ts

const toUserCreateForm = const toUserForm = generateModelForm<
  User & { password: string | null }
>({
  simpleKeys: ["name", "email"],
  complexKeys: {
    password: {
      get: () => null,
      set: (model) => decrypt(model.password)
    },
    created_at: {
      get: () => new Date.getTime(),
      set: (model) => new Date(model.created_at).getTime(),
    },
    updated_at: {
      get: () => new Date.getTime(),
    },
  },
});

const form = toUserCreateForm();

form = {
  name: null,
  password: null,
  email: null,
  created_at: 1642608000000,
  updated_at: 1642608000000,
}

```

##### Create form on existing model

```ts
const model = {
  id: 1,
  name: "Bob",
  email: "email@example.com",
  created_at: "January 1, 2022"
  email_verified_at: "January 2, 2022"
  updated_at: "January 3, 2022"
}

const form = toUserForm( model );

form = {
  name: "Bob",
  email: "email@example.com",
  created_at: 1640966400000, // new Date("January 1, 2022").getTime()
  updated_at: "January 3, 2022",
}
```

### generateFormSubmssionEvent

Creates a form submission event.

#### Usage

```javascript
  const { generateFormSubmissionEvent } = useFormHelper();

  const onSubmit = generateFormSubmissionEvent(
    form, // Your Inertia useForm object
    submitRoute, // Href to your object,
    processing = ref(false), // Optional, a boolean ref that's connected to the rest of your loading states
    patch = false, // If true, then the form submits as a PATCH, else POST
    cb = null // A callback function once the form is done. Internally, uses Inertia's onFinish() hook.
  )

  <template>
    <button @click="onSubmit">Save</button>
  </template>

```

# Interfaces

## Laravel Pagination

## LaravelDataTableColumns<T>
