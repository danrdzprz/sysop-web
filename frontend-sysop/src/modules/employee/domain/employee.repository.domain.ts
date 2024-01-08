import type { EmployeeDomain } from "./employee.domain";
import type { ResponseSuccess } from "@/modules/shared/domain/ResponseSucces";
import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { PaginationDomain } from "@/modules/shared/domain/Pagination";
import type { PaginationOptionsDomain } from "~/modules/shared/domain/PaginationOptions";

export interface EmployeeRepository {
    list: (data: PaginationOptionsDomain) => Promise<PaginationDomain<EmployeeDomain> | ResponseFailure>;
    create: (data: EmployeeDomain) => Promise<ResponseFailure | ResponseSuccess>;
    detail: (id:number) => Promise<EmployeeDomain | ResponseFailure>;
    update: (id:number, data: EmployeeDomain) => Promise<ResponseSuccess | ResponseFailure>;
    destroy: (id:number) => Promise<ResponseFailure | ResponseSuccess>;
}