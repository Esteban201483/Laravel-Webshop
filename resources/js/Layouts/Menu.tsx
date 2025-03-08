import { Link, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

 
import './layouts.css';
import { useEffect, useState } from 'react';

type Props = {
    isAuthenticated: boolean;
};

export default function Menu(props: Props){

    let [openMenu, setOpenMenu] = useState('');
    let [categories, setCategories] = useState(new Array());

    const { data, setData, post, processing, errors, reset } = useForm({});

    async function getCategories(){
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
        await fetch('category', {method: "GET", 
            headers: { "Content-Type" : "application/json" ,  "X-CSRF-TOKEN": csrfToken || ""}, 

                })
            .then(response => {
                response.json().then(receivedData =>{
                    const newCategories:any = [];

                    for(let category of receivedData["categories"]){
                        //newCategories.push(category.name);
                        //if(categories.indexOf(category.name) === -1)
                            newCategories.push(category.name);   
                    }

                    console.log("Calling Categories")
                    console.log(categories)
                    setCategories(prevCategories => [...new Set([...prevCategories, ...newCategories])]);

                    
                })
        
            })
    }

    async function logout(){

        post(route('logout'), {
            onSuccess: () => {
                window.sessionStorage.removeItem("authenticated");
            },
            onError: () =>{
                
            }
        });
    }

    function toggleRightOption(option:string):any {

        switch(option){
            case 'wishlist':
                window.location.href = (route('wishlist'));
                break;
            case 'profile':
                window.location.href = (route('profile'));
                break;
            case 'cart':
                window.location.href = (route('cart'));
                break;
        }
    }

    function toggleMenu(option:string): any{
        if(openMenu === option)
            openMenu = '';
        else
            openMenu = option;

        setOpenMenu(openMenu);
    }

    useEffect(() => {
        getCategories();
    }, []); // Run once when the component mounts

    return(<>
        <div className="menusContainer">
            <nav id="main-menu" className="flex flex-1 justify-center">

                {categories.map((category: any) => (
                    <Link
                    href={route('catalog')}
                    className="menu-item  rounded-md px-3 py-2 ring-1 ring-transparent "
                    >
                    {category}
                    </Link>
                ))
                }
                <Link
                href={route('catalog')}
                className="menu-item  rounded-md px-3 py-2 ring-1 ring-transparent "
                >
                Catalog
                </Link>

                
            </nav>
            <nav id="right-menu">
            <div><FontAwesomeIcon onClick={() => {toggleRightOption('search')}} className="right-icon" icon={faMagnifyingGlass} /></div>
            <div><FontAwesomeIcon onClick={() => {toggleRightOption('cart')}} className="right-icon" icon={faCartShopping} /></div>
            <div><FontAwesomeIcon onClick={() => {toggleRightOption('wishlist')}} className="right-icon" icon={faHeart} /></div>
            <div>
                <FontAwesomeIcon onClick={() => {toggleMenu('profile');}} className={`right-icon ${(openMenu === 'profile')? 'active' : ''}`} icon={faUser} />
                {(openMenu === 'profile' && !props.isAuthenticated)?<div className="overlay-menu">
                    <div className="item" onClick={() => {window.location.href = route('login');}}>Log in</div>
                    <div className="item" onClick={() => {window.location.href = route('register');}}>Register</div>
                </div> : <></>}
                {(openMenu === 'profile' && props.isAuthenticated)?<div className="overlay-menu">
                    <div className="item" onClick={() => {console.log(route('profile')); window.location.href = route('profile2');}}>Profile</div>
                    <div className="item"  onClick={logout}>Log Out</div>
                </div> : <></>}

            </div>
            </nav>
        </div>
    </>);
}
