import type { PaginationOptionsDomain } from "~/modules/shared/domain/PaginationOptions";
import type { PostDomain } from "./post.domain";
import type { ResponseFailure } from "~/modules/shared/domain/ResponseFailure";
import type { PaginationDomain } from "~/modules/shared/domain/Pagination";
import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";

export interface PostRepositoryDomain {
    list: (data: PaginationOptionsDomain) => Promise<PaginationDomain<PostDomain> | ResponseFailure>;
    create: (data: PostDomain) => Promise<ResponseFailure | ResponseSuccess>;
    detail: (id:number) => Promise<PostDomain | ResponseFailure>;
    update: (id:number, data: PostDomain) => Promise<ResponseSuccess | ResponseFailure>;
    destroy: (id:number) => Promise<ResponseFailure | ResponseSuccess>;
}