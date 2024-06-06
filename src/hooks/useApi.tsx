export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    game = 'game'
}

export interface SearchResult {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
    Type: string;
}

export interface SearchError {
    Response: string;
    Error: string;
}

export interface DetailsResult {
    Genre: string;
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    imdbRating: string;
    Director: string;
    Actors: string;
    Website: string;
    Awards: string;
}

export const useApi = () => {
    let url = 'https://www.omdbapi.com/'
    let apiKey = '68ab9f3f'

    const searchData = async (title: string, type: SearchType): Promise<SearchResult[] | SearchError> => {
        const result = await fetch(`${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`)
        return result.json()
    }

    const getDetails = async (id: string): Promise<DetailsResult> => {
        const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`)
        return result.json()
    }

    return {
        searchData,
        getDetails
    }

}

export default useApi