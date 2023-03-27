export type Movie = {
    id: number,
    title: string,
    overview:string,
    poster_path:string
    release_date: string,
    genre_ids: Array<number>,
}

export type MovieSearchResult = {
    page: number,
    total_pages: number,
    results: Array<Movie>,
    total_results: number
}

export type ProductionCompany = {
    name: string,
    logo_path:string
}

export type Collection = {
    name:string,
    poster_path:string
    backdrop_path:string,
}
export interface MovieEntry extends Movie {
    tagline: string,
    backdrop: string,
    production_companies: Array<ProductionCompany>,
    belongs_to_collection: Collection
}