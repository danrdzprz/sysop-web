import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";
import type { PostRepositoryDomain } from "../domain/post.repository.domain";
import type { PostDomain } from "../domain/post.domain";

export function useCaseCreatePost(repository: PostRepositoryDomain) {
	return async (data: PostDomain): Promise<ResponseSuccess | ResponseFailure> => {
		return await repository.create(data);
	};
}