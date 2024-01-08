import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { PostRepositoryDomain } from "../domain/post.repository.domain";
import type { PostDomain } from "../domain/post.domain";

export function useCaseDetailPost(repository: PostRepositoryDomain) {
	return async (id: number): Promise<PostDomain | ResponseFailure> => {
		return await repository.detail(id);
	};
}