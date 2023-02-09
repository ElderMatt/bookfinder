export interface resultType {
    totalItems: Number,
    items: bookType[]
}

export interface bookType {
    id: string,
    volumeInfo: {
        title: string,
        authors: string[],
        language: string,
        imageLinks: {
            thumbnail: string
        }
    },
    saleInfo: {
        buyLink: string
    }
}