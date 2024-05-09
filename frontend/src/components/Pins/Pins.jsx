import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function Pins() {
    const authHeader = useAuthHeader();
    const auth = useAuthUser();

    // const fetchPins = async (page) => {
	// 	const response = await fetch(`http://localhost:5000/api/v1/pins`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json', 
	// 			"Authorization": authHeader,
	// 		},
	// 	});
	// 	return await response.json();
	// }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col p-3">
                <h3 className="text-center scroll-m-20 text-md tracking-tight m-0 font-semibold">
                    Tell us <span className="text-primary font-extrabold">where</span> are you?
                </h3>
            </CardHeader>

            <CardContent className="flex flex-row gap-2 justify-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                <Skeleton className="w-[50px] h-[50px] rounded-full"/>
            </CardContent>
            {/* <CardFooter className="flex justify-between">

            </CardFooter> */}
        </Card>
    )
}

export default Pins
