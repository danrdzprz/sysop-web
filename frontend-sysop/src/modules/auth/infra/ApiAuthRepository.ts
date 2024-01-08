import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { IAuth } from '../domain/Auth';
import type { AuthFailure } from '../domain/AuthFailure';
import type { AuthRepository } from '../domain/AuthRepository';
import type { AuthSuccess } from '../domain/AuthSucces';
import type { Me } from '../domain/Me';
import { request } from '~/utils/http-common';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';


export function authRepository(): AuthRepository {

	async function login(data: IAuth): Promise<AuthSuccess | AuthFailure> {
		const response = await request(`/api/login`,{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as AuthFailure;
			throw error;
		}
	}

	async function me(): Promise<Me | ResponseFailure> {
		const response = await request(`/api/me`,{
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if(response.ok){
			return await response.json();
		}else{
			const error = await response.json() as AuthFailure;
			throw error;
		}
	}

	async function logout(): Promise<ResponseSuccess|ResponseFailure> {
		const response = await request(`/api/logout`,{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-type': 'application/json; charset=UTF-8',
			}
		});
		const users = await response.json();
		return users;
	}

	return {
		login,
		logout,
		me
	};
}