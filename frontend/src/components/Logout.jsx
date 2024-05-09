import { useEffect } from 'react';

import useSignOut from 'react-auth-kit/hooks/useSignOut'
import {useNavigate} from 'react-router-dom';

function Logout() {

    const signOut = useSignOut()
    const navigate = useNavigate()


    useEffect(() => {
        signOut();
        navigate("/login");
    }, []);

    return null;
}

export default Logout
