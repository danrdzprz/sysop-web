import type { IAuth } from '../../domain/Auth';
import type { AuthFailure } from '../../domain/AuthFailure';
import type { AuthRepository } from '../../domain/AuthRepository';
import type { AuthSuccess } from '../../domain/AuthSucces';

export function loginAction(authRepository: AuthRepository) {
	return async (data: IAuth): Promise<AuthSuccess | AuthFailure> => {
		return await authRepository.login(data);
	};
}