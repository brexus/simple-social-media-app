import React from 'react'
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

function Reaction({postId, likes}) {
	const authHeader = useAuthHeader();
    const { toast } = useToast();

    const [isLiked, setIsLiked] = useState(false);              // tutaj wstaw czy polubiony

    const [likesCounter, setLikesCounter] = useState(likes.length);

    useEffect(() => {
        fetch(`http://localhost:3000/api/posts/${postId}/reaction`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Błąd sieci!');
			}
			return response.json();
		})
		.then(data => {
            if(data.reaction) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
            
		})
		.catch(error => {
			console.log(error.message);
		});

	}, []);

    const onClickLike = () => {
        fetch(`http://localhost:3000/api/posts/${postId}/reaction`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error("Błąd sieci!");
			}
			return response.json();
		})
		.then(data => {
            setIsLiked(like => !like);
            setLikesCounter(data.like);
		})
		.catch(error => {
			console.log(error.message);
            toast({
                variant: "destructive",
                title: "",
                description: "Try again later!",
            })
		});
    };


    return (
        <div className="flex flex-row gap-3">
            <Button variant="secondary" onClick={onClickLike}>
                <div className="flex flex-row justify-center items-center gap-2">
                    {isLiked ? <Icons.likeFill className="h-6 w-6 fill-primary" /> : <Icons.likeEmpty className="h-6 w-6 fill-primary" />}
                    {likesCounter}
                </div>
            </Button>
        </div>
    )
}

export default Reaction;
