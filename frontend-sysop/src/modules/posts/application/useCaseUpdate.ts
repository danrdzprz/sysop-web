import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";
import type { PostRepositoryDomain } from "../domain/post.repository.domain";
import type { PostDomain } from "../domain/post.domain";

export function useCaseUpdatePost(repository: PostRepositoryDomain) {
	return async (id: number, data: PostDomain): Promise<ResponseSuccess | ResponseFailure> => {
		return await repository.update(id, data);
	};
}