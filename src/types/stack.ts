export type StackItem = {
    name: string;
    icon?: string;
    featured?: boolean;
};

export type StackCategory = {
    title: string;
    items: StackItem[];
};

export type StackCategories = {
    frontend: StackItem[];
    backend: StackItem[];
    database: StackItem[];
    tools: StackItem[];
};
