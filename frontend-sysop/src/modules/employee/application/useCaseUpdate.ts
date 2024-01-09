import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";
import type { EmployeeRepository } from "../domain/employee.repository.domain";
import type { EmployeeDomain } from "../domain/employee.domain";

export function useCaseUpdateEmployee(repository: EmployeeRepository) {
	return async (id: number, data: EmployeeDomain): Promise<ResponseSuccess | ResponseFailure> => {
		return await repository.update(id, data);
	};
}