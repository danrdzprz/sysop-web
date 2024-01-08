import type { ResponseSuccess } from "@/modules/shared/domain/ResponseSucces";
import type { EmployeeDomain } from "../domain/employee.domain";
import type { EmployeeRepository } from "../domain/employee.repository.domain";
import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";

export function createEmployee(repository: EmployeeRepository) {
	return async (data: EmployeeDomain): Promise<ResponseSuccess | ResponseFailure> => {
		return await repository.create(data);
	};
}