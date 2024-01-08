import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { RoleRepository } from "../domain/role.repository.domain";
import type { CatalogDomain } from "~/modules/shared/domain/catalog";

export function useCaseCatalogRoles(repository: RoleRepository) {
	return async (): Promise<CatalogDomain[] | ResponseFailure> => {
		return await repository.catalog();
	};
}