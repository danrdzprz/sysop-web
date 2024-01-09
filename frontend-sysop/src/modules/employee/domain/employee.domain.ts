import type { RoleDomain } from "~/modules/roles/domain/role.domain";

export interface EmployeeDomain{
    id:number;
    name:string;
    birthdate:string;
    phone:string;
    email:string;
    role: RoleDomain;
    password: string;
    password_confirmation: string;
}

export interface EmployeeListDomain{
    id:number;
    name:string;
    birthdate:string;
    phone:string;
    email:string;
    role_name: string;
}