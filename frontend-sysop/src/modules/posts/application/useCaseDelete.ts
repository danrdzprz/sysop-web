import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";
import type { PostRepositoryDomain } from "../domain/post.repository.domain";

export function useCaseDeletePost(repository: PostRepositoryDomain) {
	return async (id: number): Promise<ResponseSuccess | ResponseFailure> => {
		return await repository.destroy(id);
	};
}