import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MainNav } from "./main-nav";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserNav } from "./user-nav";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useLocation } from 'react-router-dom';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export function Navbar() {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();
    const auth = useAuthUser();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container grid grid-cols-3 h-14 max-w-screen-2xl items-center">
                
                {/* 1 kolumna */}
                <div className="mr-4 col-span-1 flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <Icons.logo className="h-6 w-6" />
                        <span className="font-bold inline-block">
                            Social Media
                        </span>
                    </Link>
                </div>

                {/* 2 kolumna */}
                <div className="col-span-1 flex justify-center">
                    <div className="flex flex-row w-[100px] justify-around">
                    { isAuthenticated() ?
                        <>
                            <Link to="/">
                                {location.pathname == "/" ? <Icons.homeFeedFill className="h-7 w-7 fill-primary" /> : <Icons.homeFeedEmpty className="h-7 w-7 fill-foreground" />}
                            </Link>
                            <Link to={`/profile/${auth._id}`}>
                                {location.pathname == `/profile/${auth._id}` ? <Icons.friendsFeedFill className="h-7 w-7 fill-primary" /> : <Icons.friendsFeedEmpty className="h-7 w-7 fill-foreground" />}
                            </Link>
                            {/* <Link to="/explore-feed">
                                {location.pathname == "/explore-feed" ? <Icons.locationFeedFill className="h-7 w-7 fill-primary" /> : <Icons.locationFeedEmpty className="h-7 w-7 fill-foreground" />}
                            </Link> */}
                        </> : null }
                    </div>
                </div>

                {/* 3 kolumna */}
                <div className="col-span-1 flex justify-end">
                    <ModeToggle className="mx-3"/>
                    { isAuthenticated() ? <UserNav  /> : null }
                </div>

            </div>
        </nav>
    );
}

// import { Link } from 'react-router-dom'
// import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

// const Navbar = () => {
//     const isAuthenticated = useIsAuthenticated()

//     return (
//         <nav className="bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600">
//             <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//             <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//                 {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
//                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Travel App</span>
//             </a>
//             <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

//                 { isAuthenticated() ? (
//                     <>
//                     <Link to="/profile" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                         Profile
//                     </Link>
//                     <Link to="/logout" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
//                         Logout
//                     </Link>
//                     </>
//                 ) : (
//                     <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                         Login
//                     </Link>)
//                 }

//                 <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
//                     <span className="sr-only">Open main menu</span>
//                     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
//                     </svg>
//                 </button>
//             </div>
//             <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
//                 <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                 <li>
//                     <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
//                 </li>
//                 <li>
//                     <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
//                 </li>
//                 <li>
//                     <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
//                 </li>
//                 <li>
//                     <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//                 </li>
//                 </ul>
//             </div>
//             </div>
//         </nav>
//     )
// }

export default Navbar;
