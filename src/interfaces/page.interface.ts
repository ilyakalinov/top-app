export enum TopLavelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export interface TopPageModel {
    _id: string;
    tags: string[];
    secondCategory: string;
    alias: string;
    title: string;
    category: string;
    seoText: string;
    tagsTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstCategory: TopLavelCategory;
    advantages: TopPageAdvantage[];
    createdAt: string;
    updatedAt: string;
    hh: IHhData;
}

export interface TopPageAdvantage {
    title: string;
    description: string;
    _id: string;
}

export interface IHhData {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updatedAt: string;
    _id: string;
}
