import type { PaginationOptionsDomain } from "~/modules/shared/domain/PaginationOptions";
import type { PaginationDomain } from "@/modules/shared/domain/Pagination";
import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { PostRepositoryDomain } from "../domain/post.repository.domain";
import type { PostDomain } from "../domain/post.domain";

export function useCaselistPosts(repository: PostRepositoryDomain) {
	return async (data: PaginationOptionsDomain): Promise<PaginationDomain<PostDomain>  | ResponseFailure> => {
		return await repository.list(data);
	};
}