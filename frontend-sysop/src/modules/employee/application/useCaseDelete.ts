import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";
import type { EmployeeRepository } from "../domain/employee.repository.domain";

export function useCaseDeleteEmployee(repository: EmployeeRepository) {
	return async (id: number): Promise<ResponseSuccess | ResponseFailure> => {
		return await repository.destroy(id);
	};
}