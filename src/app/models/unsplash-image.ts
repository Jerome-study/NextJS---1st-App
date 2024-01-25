export interface UnsplashImage {
    description: string,
    user: {
        username: string
    },
    urls: {
        raw: string
    },
    height: number,
    width: number
}

export interface UnsplashImageSearchResponse {
    results: UnsplashImage[];
}