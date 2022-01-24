import { LaravelDataTableColumn, LaravelPagination } from "@/Components/naive-inertia-js-components";
import { User } from "@/Types/models";
import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    users: {
        type: PropType<LaravelPagination<User>>;
        required: true;
    };
}, {
    processing: import("vue").Ref<boolean>;
    handleSubmit: () => void;
    form: import("vue").Ref<{
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        isDirty: boolean;
        errors: {
            id: string;
            name: string;
            email: string;
            email_verified_at: string;
            created_at: string;
        };
        hasErrors: boolean;
        processing: boolean;
        progress: {
            percentage: number;
        } | null;
        wasSuccessful: boolean;
        recentlySuccessful: boolean;
        data: () => User;
        transform: (callback: (data: User) => object) => import("@inertiajs/inertia-vue3").InertiaForm<User>;
        reset: (...fields: (keyof User)[]) => import("@inertiajs/inertia-vue3").InertiaForm<User>;
        clearErrors: (...fields: (keyof User)[]) => import("@inertiajs/inertia-vue3").InertiaForm<User>;
        submit: (method: string, url: string, options?: Partial<Partial<import("@inertiajs/inertia").Visit & {
            onCancelToken: ({ cancel }: {
                cancel: VoidFunction;
            }) => void;
            onBefore: import("@inertiajs/inertia").GlobalEventCallback<"before">;
            onStart: import("@inertiajs/inertia").GlobalEventCallback<"start">;
            onProgress: import("@inertiajs/inertia").GlobalEventCallback<"progress">;
            onFinish: import("@inertiajs/inertia").GlobalEventCallback<"finish">;
            onCancel: import("@inertiajs/inertia").GlobalEventCallback<"cancel">;
            onSuccess: import("@inertiajs/inertia").GlobalEventCallback<"success">;
            onError: import("@inertiajs/inertia").GlobalEventCallback<"error">;
        }>> | undefined) => void;
        get: (url: string, options?: Partial<Partial<import("@inertiajs/inertia").Visit & {
            onCancelToken: ({ cancel }: {
                cancel: VoidFunction;
            }) => void;
            onBefore: import("@inertiajs/inertia").GlobalEventCallback<"before">;
            onStart: import("@inertiajs/inertia").GlobalEventCallback<"start">;
            onProgress: import("@inertiajs/inertia").GlobalEventCallback<"progress">;
            onFinish: import("@inertiajs/inertia").GlobalEventCallback<"finish">;
            onCancel: import("@inertiajs/inertia").GlobalEventCallback<"cancel">;
            onSuccess: import("@inertiajs/inertia").GlobalEventCallback<"success">;
            onError: import("@inertiajs/inertia").GlobalEventCallback<"error">;
        }>> | undefined) => void;
        post: (url: string, options?: Partial<Partial<import("@inertiajs/inertia").Visit & {
            onCancelToken: ({ cancel }: {
                cancel: VoidFunction;
            }) => void;
            onBefore: import("@inertiajs/inertia").GlobalEventCallback<"before">;
            onStart: import("@inertiajs/inertia").GlobalEventCallback<"start">;
            onProgress: import("@inertiajs/inertia").GlobalEventCallback<"progress">;
            onFinish: import("@inertiajs/inertia").GlobalEventCallback<"finish">;
            onCancel: import("@inertiajs/inertia").GlobalEventCallback<"cancel">;
            onSuccess: import("@inertiajs/inertia").GlobalEventCallback<"success">;
            onError: import("@inertiajs/inertia").GlobalEventCallback<"error">;
        }>> | undefined) => void;
        put: (url: string, options?: Partial<Partial<import("@inertiajs/inertia").Visit & {
            onCancelToken: ({ cancel }: {
                cancel: VoidFunction;
            }) => void;
            onBefore: import("@inertiajs/inertia").GlobalEventCallback<"before">;
            onStart: import("@inertiajs/inertia").GlobalEventCallback<"start">;
            onProgress: import("@inertiajs/inertia").GlobalEventCallback<"progress">;
            onFinish: import("@inertiajs/inertia").GlobalEventCallback<"finish">;
            onCancel: import("@inertiajs/inertia").GlobalEventCallback<"cancel">;
            onSuccess: import("@inertiajs/inertia").GlobalEventCallback<"success">;
            onError: import("@inertiajs/inertia").GlobalEventCallback<"error">;
        }>> | undefined) => void;
        patch: (url: string, options?: Partial<Partial<import("@inertiajs/inertia").Visit & {
            onCancelToken: ({ cancel }: {
                cancel: VoidFunction;
            }) => void;
            onBefore: import("@inertiajs/inertia").GlobalEventCallback<"before">;
            onStart: import("@inertiajs/inertia").GlobalEventCallback<"start">;
            onProgress: import("@inertiajs/inertia").GlobalEventCallback<"progress">;
            onFinish: import("@inertiajs/inertia").GlobalEventCallback<"finish">;
            onCancel: import("@inertiajs/inertia").GlobalEventCallback<"cancel">;
            onSuccess: import("@inertiajs/inertia").GlobalEventCallback<"success">;
            onError: import("@inertiajs/inertia").GlobalEventCallback<"error">;
        }>> | undefined) => void;
        delete: (url: string, options?: Partial<Partial<import("@inertiajs/inertia").Visit & {
            onCancelToken: ({ cancel }: {
                cancel: VoidFunction;
            }) => void;
            onBefore: import("@inertiajs/inertia").GlobalEventCallback<"before">;
            onStart: import("@inertiajs/inertia").GlobalEventCallback<"start">;
            onProgress: import("@inertiajs/inertia").GlobalEventCallback<"progress">;
            onFinish: import("@inertiajs/inertia").GlobalEventCallback<"finish">;
            onCancel: import("@inertiajs/inertia").GlobalEventCallback<"cancel">;
            onSuccess: import("@inertiajs/inertia").GlobalEventCallback<"success">;
            onError: import("@inertiajs/inertia").GlobalEventCallback<"error">;
        }>> | undefined) => void;
        cancel: () => void;
    }>;
    routeValue: string;
    table: {
        columns: LaravelDataTableColumn<unknown>[];
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    users: {
        type: PropType<LaravelPagination<User>>;
        required: true;
    };
}>>, {}>;
export default _default;
