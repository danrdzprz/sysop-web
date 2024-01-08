import type { PaginationOptionsDomain } from "~/modules/shared/domain/PaginationOptions";
import type { EmployeeDomain } from "../domain/employee.domain";
import type { EmployeeRepository } from "../domain/employee.repository.domain";
import type { PaginationDomain } from "@/modules/shared/domain/Pagination";
import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";

export function useCaselistEmployees(repository: EmployeeRepository) {
	return async (data: PaginationOptionsDomain): Promise<PaginationDomain<EmployeeDomain>  | ResponseFailure> => {
		return await repository.list(data);
	};
}