import type { EmployeeDomain } from "~/modules/employee/domain/employee.domain";

export interface PostDomain {
    id: number;
    title: string;
    text: string;
    user: EmployeeDomain;
}