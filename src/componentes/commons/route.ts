import { HomePage, SkinsPage} from "../../pages/index";

type JSXComponent = () => JSX.Element;

interface Route {
    path: string;
    component: JSXComponent;
    name: string;
    children?: Route[]
}



export const routes: Route[] = [
    {
        path: '/',
        component: HomePage,
        name: 'Home'
    },
    {
        path: '/skins',
         component: SkinsPage,
        name: 'Skins'
    }
]