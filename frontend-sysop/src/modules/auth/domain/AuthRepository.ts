import type { ResponseFailure } from "~/modules/shared/domain/ResponseFailure";
import type { IAuth } from "./Auth";
import type { AuthFailure } from "./AuthFailure";
import type { AuthSuccess } from "./AuthSucces";
import type { Me } from "./Me";
import type { ResponseSuccess } from "~/modules/shared/domain/ResponseSucces";

export interface AuthRepository {
	login: (data: IAuth) => Promise<AuthSuccess | AuthFailure>;
	logout: () => Promise<ResponseSuccess|ResponseFailure>;
	me: () => Promise<Me | ResponseFailure>;
}