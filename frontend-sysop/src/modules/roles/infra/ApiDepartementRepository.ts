import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import { request } from '~/utils/http-common';
import type { RoleRepository } from "../domain/role.reposotory.domain";
import type { CatalogDomain } from "~/modules/shared/domain/catalog";

const JSONPLACEHOLDER_URL = 'http://localhost';

export function ApiRoleRepository(): RoleRepository {

	async function catalog(): Promise<CatalogDomain | ResponseFailure> {
		try {
			const response = await request(`${JSONPLACEHOLDER_URL}/api/catalogs/role`,{
				method: 'GET',
				headers: {
					'Content-Yype': 'application/json; charset=UTF-8',
				},
			});
			if(response.ok){
				return await response.json() as CatalogDomain;
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