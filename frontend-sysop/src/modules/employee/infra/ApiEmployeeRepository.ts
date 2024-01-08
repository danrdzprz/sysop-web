import type { ResponseSuccess } from "@/modules/shared/domain/ResponseSucces";
import type { EmployeeDomain } from "../domain/employee.domain";
import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { EmployeeRepository } from "../domain/employee.repository.domain";
import type { PaginationDomain } from "@/modules/shared/domain/Pagination";
import { request } from '~/utils/http-common';
import type { PaginationOptionsDomain } from "~/modules/shared/domain/PaginationOptions";


export function ApiEmployeeRepository(): EmployeeRepository {

	async function list(data: PaginationOptionsDomain): Promise<PaginationDomain<EmployeeDomain> | ResponseFailure> {
		try {
			const response = await request(`/api/users?page=${data.page}&page_size=${data.itemsPerPage}`,{
				method: 'GET',
				headers: {
					'Content-Yype': 'application/json; charset=UTF-8',
				},
			});
			if(response.ok){
				return await response.json() as PaginationDomain<EmployeeDomain>;
			}else{
				const error = await response.json() as ResponseFailure;
				throw error;
			}
			
		} catch (error) {
			console.log(error); 
			return error as ResponseFailure
		}
	}
    async function create(data:EmployeeDomain): Promise<ResponseSuccess | ResponseFailure> {
		const response = await request(`/api/users`,{
			method: 'POST',
            body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function detail(id:number): Promise<EmployeeDomain | ResponseFailure> {
		const response = await request(`/api/users/${id}`,{
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function update(id:number, data: EmployeeDomain): Promise<ResponseSuccess | ResponseFailure> {
		const response = await request(`/api/users/${id}`,{
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json() as ResponseSuccess;
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
    async function destroy(id: number): Promise<ResponseSuccess | ResponseFailure> {
		const response = await request(`/api/users/${id}`,{
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as ResponseFailure;
			throw error;
		}
	}
	
	return {
		list,
        create,
        detail,
        update,
        destroy,
	};
}