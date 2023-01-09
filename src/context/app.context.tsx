import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { MenuItem } from '@/interfaces/menu.interface';
import { TopLavelCategory } from '@/interfaces/page.interface';
import { useRouter } from 'next/router';

export interface IAppContext {
    menu: MenuItem[];
    firstCategory: TopLavelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
    menu: [],
    firstCategory: TopLavelCategory.Courses,
});

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>): JSX.Element => {
    const router = useRouter();
    const [menuState, setMenuItem] = useState<MenuItem[]>(menu);

    useEffect(() => {
        setMenuItem(menu);
    }, [menu]);

    const setMenu = (newMenu: MenuItem[]) => {
        setMenuItem(newMenu);
    };

    return <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>{children}</AppContext.Provider>;
};
