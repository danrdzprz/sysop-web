import type { ResponseFailure } from "~/modules/shared/domain/ResponseFailure";
import type { EmployeeDomain } from "../domain/employee.domain";
import type { EmployeeRepository } from "../domain/employee.repository.domain";

export function useCaseDetailEmployee(repository: EmployeeRepository) {
	return async (id: number): Promise<EmployeeDomain | ResponseFailure> => {
		return await repository.detail(id);
	};
}