
export interface PaginatedResponse<T> {
    readonly pageNumber: number
    readonly pageSize: number
    readonly results: T[]
}