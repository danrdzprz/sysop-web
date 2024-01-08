export type PaginationDomain<T>   ={
    "data": T[];
    "links"?: {
        "first": string;
        "last": string;
        "prev": string|null;
        "next": string|null;
    },
    "meta"?: {
        "current_page": number;
        "from": number;
        "last_page": number;
        "links": link[];
        "path": string;
        "per_page": number;
        "to": number;
        "total": number;
    }
    "current_page"?: 1,
    "first_page_url"?:string|null,
    "from"?: number,
    "last_page"?: number;
    "last_page_url"?: string|null,
    "next_page_url"?: string|null,
    "path"?: string|null,
    "per_page"?: number,
    "prev_page_url"?: string|null,
    "to"?: number,
    "total"?: number
}

interface link{
    "url": string|null;
    "label": string|null;
    "active": boolean;
}