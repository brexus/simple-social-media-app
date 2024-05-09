import { BrowserRouter, Route, Routes } from "react-router-dom";

// import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Logout from "./pages/Logout/Logout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// import Secure from "./componants/Secure";

const RoutesPage = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* public */}
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register />} />

                {/* private */}
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path='/' element={<Home/>} />
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/logout' element={<Logout />} />
                </Route>

                {/* error page */}
                <Route path='*' element={<ErrorPage />}/>

            </Routes>
        </BrowserRouter>
    );
};

export default RoutesPage;

            {/* <Routes>
                 <Route path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/secure"} element={
                    <RequireAuth fallbackPath={"/login"}>
                        <Secure />
                    </RequireAuth>
                }/>
            </Routes> */}