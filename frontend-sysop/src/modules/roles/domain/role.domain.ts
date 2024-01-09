export interface crudActions {
    create: boolean;
    update: boolean;
    read: boolean;
    delete: boolean;
}

export interface permissions {
    root: boolean;
    employees: crudActions,
}

export interface RoleDomain {
    id: number;
    name: string;
    permissions: permissions;
}