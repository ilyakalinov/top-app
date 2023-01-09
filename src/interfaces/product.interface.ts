export interface ProductModel {
    _id: string;
    categories: string[];
    tags: string[];
    title: string;
    image: string;
    description: string;
    link: string;
    price: number;
    credit: number;
    oldPrice: number;
    characteristics: ProductCharacteristic[];
    initialRating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    html: string;
    blog: Blog;
    companyId: string;
    clicks: number;
    reviews: ReviewModel[];
    reviewCount: number;
    reviewAvg: number;
    advantages?: string;
    disadvantages?: string;
}

export interface ProductCharacteristic {
    name: string;
    value: string;
}

export interface Blog {
    text: string;
    _id: string;
    bigImage?: string;
}

export interface ReviewModel {
    _id: string;
    name: string;
    title: string;
    description: string;
    rating: number;
    createdAt: Date;
}
