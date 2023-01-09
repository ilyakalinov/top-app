import { TopLavelCategory, TopPageModel } from '@/interfaces/page.interface';
import { ProductModel } from '@/interfaces/product.interface';

export interface TopPageComponentProps extends Record<string, unknown> {
    firstCategory: TopLavelCategory;
    page: TopPageModel;
    products: ProductModel[];
}
