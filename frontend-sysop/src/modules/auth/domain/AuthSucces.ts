import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";

export interface AuthSuccess extends ResponseSuccess {
    token: string;
}

// export interface AuthSuccess {
//     status: boolean;
//     message: string;
//     token: string;
// }