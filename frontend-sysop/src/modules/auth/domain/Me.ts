import type { RoleDomain } from "~/modules/roles/domain/role.domain";

export interface Me {
    name: string;
    email: string;
    role: RoleDomain
}