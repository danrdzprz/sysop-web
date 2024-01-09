import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import { request } from '~/utils/http-common';
import type { RoleRepository } from "../domain/role.repository.domain";
import type { CatalogDomain } from "~/modules/shared/domain/catalog";

export function ApiRoleRepository(): RoleRepository {

	async function catalog(): Promise<CatalogDomain[] | ResponseFailure> {
		try {
			const response = await request(`/api/catalogs/roles`,{
				method: 'GET',
				headers: {
					'Content-Yype': 'application/json; charset=UTF-8',
				},
			});
			if(response.ok){
				return await response.json() as CatalogDomain[];
			}else{
				const error = await response.json() as ResponseFailure;
				throw error;
			}
			
		} catch (error) {
			console.log(error); 
			return error as ResponseFailure
		}
	}

    return {
        catalog,
    }
}