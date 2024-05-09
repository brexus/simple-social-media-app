import { useEffect } from 'react';

import useSignOut from 'react-auth-kit/hooks/useSignOut'
import {useNavigate} from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

function Logout() {

    const signOut = useSignOut()
    const navigate = useNavigate()
    const { toast } = useToast();

    useEffect(() => {
        signOut();
        navigate("/login");
        toast({
            title: "Hurrah!",
            description: "Successfully logged out!",
            className: "bg-green-800"
        })
    }, []);

    return null;
}

export default Logout
