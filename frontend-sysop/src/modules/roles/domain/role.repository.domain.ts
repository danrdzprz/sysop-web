import type { ResponseFailure } from "@/modules/shared/domain/ResponseFailure";
import type { CatalogDomain } from "~/modules/shared/domain/catalog";

export interface RoleRepository {
    catalog: () => Promise<CatalogDomain[] | ResponseFailure>;
}