import { Link, useForm } from '@inertiajs/react';

import './layouts.css';

type Props = {
    isAuthenticated: boolean;
};


export default function Menu(props: Props){
    const { data, setData, post, processing, errors, reset } = useForm({});

    async function logout(){

        post(route('logout'), {
            onSuccess: () => {
                window.sessionStorage.removeItem("authenticated");
            },
            onError: () =>{
                
            }
        });
    }

    return(<>
        <nav id="main-menu" className="flex flex-1 justify-center">
            {(!props.isAuthenticated)? <Link
            href={route('login')}
            className="menu-item  rounded-md px-3 py-2 ring-1 ring-transparent "
            >
            Log in
            </Link> : <></>}
            {(!props.isAuthenticated)?<Link
            href={route('register')}
            className="menu-item rounded-md px-3 py-2 ring-1 ring-transparent "
            >
            Register
            </Link> : <></>}
            <Link
            href={route('contact')}
            className="menu-item  rounded-md px-3 py-2 ring-1 ring-transparent "
            >
            Contact
            </Link>
            <Link
            href={route('catalog')}
            className="menu-item  rounded-md px-3 py-2 ring-1 ring-transparent "
            >
            Catalog
            </Link>
            {(props.isAuthenticated)?<Link
            href={route('wishlist')}
            className="menu-item  rounded-md px-3 py-2 ring-1 ring-transparent "
            >
            Wishlist
            </Link> : <></>}
            {(props.isAuthenticated)?<span
            onClick={logout} 
            className="menu-item rounded-md px-3 py-2 ring-1 ring-transparent "
            >
            Logout
            </span> : <></>}
        </nav>
    </>);
}
