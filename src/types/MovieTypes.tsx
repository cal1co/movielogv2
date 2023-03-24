export type Movie = {
    title: string,
    release_date: string,
    id: number,
    genre_ids: Array<number>,
    overview:string,
    poster_path:string
}

export type MovieSearchResult = {
    page: number,
    results: Array<Movie>,
    total_pages: number,
    total_results: number
}