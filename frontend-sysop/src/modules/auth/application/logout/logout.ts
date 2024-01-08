import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { AuthRepository } from '../../domain/AuthRepository';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';

export function UseCaseLogout(authRepository: AuthRepository) {
	return async (): Promise<ResponseSuccess|ResponseFailure> => {
		return await authRepository.logout();
	};
}