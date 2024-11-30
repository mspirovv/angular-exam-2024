export interface Review {
    id: string;
    productId: string;
    userId: string;
    content: string;
    rating: number;
    createdAt: Date;
}
