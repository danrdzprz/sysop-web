import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { AuthRepository } from '../../domain/AuthRepository';
import type { Me } from '../../domain/Me';

export function UseCaseGetMe(authRepository: AuthRepository) {
	return async (): Promise<Me | ResponseFailure> => {
		return await authRepository.me();
	};
}