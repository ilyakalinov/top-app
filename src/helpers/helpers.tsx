import CoursesIcon from '@/components/Menu/icons/icon-courses.svg';
import BoxIcon from '@/components/Menu/icons/icon-box.svg';
import BookIcon from '@/components/Menu/icons/icon-book.svg';
import ServicesIcon from '@/components/Menu/icons/icon-services.svg';
import { TopLavelCategory } from '@/interfaces/page.interface';
import { FirstLevelMenuItem } from '@/interfaces/menu.interface';

export const _domain_path = process.env.NEXT_PUBLICK_DOMAIN;

export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLavelCategory.Courses },
    { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLavelCategory.Services },
    { route: 'books', name: 'Книги', icon: <BookIcon />, id: TopLavelCategory.Books },
    { route: 'product', name: 'Продукты', icon: <BoxIcon />, id: TopLavelCategory.Products },
];

export const priceRu = (price: number): string =>
    price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .concat(' ₽');

export const devOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};
