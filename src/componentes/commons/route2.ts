import { LoginPage } from "../../pages/index";

type JSXComponent = () => JSX.Element;

interface Ruta {
    path: string;
    component: JSXComponent;
    name: string;
    children?: Ruta[]
}



export const rutas: Ruta[] = [

    {
        path: '/login',
        component: LoginPage,
        name: 'Login'
    }
]