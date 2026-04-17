import type { Deal } from "./DealType";

export interface HomeData{
   id?: number;
    grid: HomeCategory[];
    electricCategories: HomeCategory[];
    deals: Deal[];
    shopByCategories: HomeCategory[];
    dealCategories: HomeCategory[];
}

export interface HomeCategory{
    id: number;
    categoryId: string;
    section?: string;
    name?:string;
    image: string;
    parentCategoryId?: string;
}