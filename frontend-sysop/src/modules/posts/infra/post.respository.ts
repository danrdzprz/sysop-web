import type { ResponseSuccess } from "@/modules/shared/domain/ResponseSucces";
import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { PaginationDomain } from "@/modules/shared/domain/Pagination";
import { request } from '~/utils/http-common';
import type { PaginationOptionsDomain } from "~/modules/shared/domain/PaginationOptions";
import type { PostRepositoryDomain } from "../domain/post.repository.domain";
import type { PostDomain } from "../domain/post.domain";


const JSONPLACEHOLDER_URL = 'http://localhost';

export function ApiPostRepository(): PostRepositoryDomain {

	async function list(data: PaginationOptionsDomain): Promise<PaginationDomain<PostDomain> | ResponseFailure> {
		try {
			const response = await request(`${JSONPLACEHOLDER_URL}/api/posts?page=${data.page}&page_size=${data.itemsPerPage}`,{
				method: 'GET',
				headers: {
					'Content-Yype': 'application/json; charset=UTF-8',
				},
			});
			if(response.ok){
				return await response.json() as PaginationDomain<PostDomain>;
			}else{
				const error = await response.json() as ResponseFailure;
				throw error;
			}
			
		} catch (error) {
			console.log(error); 
			return error as ResponseFailure
		}
	}

    async function create(data:PostDomain): Promise<ResponseSuccess | ResponseFailure> {
		const response = await request(`${JSONPLACEHOLDER_URL}/api/posts`,{
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
    async function detail(id:number): Promise<PostDomain | ResponseFailure> {
		const response = await request(`${JSONPLACEHOLDER_URL}/api/posts/${id}`,{
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
    async function update(id:number, data: PostDomain): Promise<ResponseSuccess | ResponseFailure> {
		const response = await request(`${JSONPLACEHOLDER_URL}/api/posts/${id}`,{
			method: 'PATCH',
            body: JSON.stringify(data),
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
		const response = await request(`${JSONPLACEHOLDER_URL}/api/posts/${id}`,{
			method: 'DELETE',
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
    }
}