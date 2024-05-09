import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { useState, useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Reaction from "@/components/Reaction/Reaction";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useToast } from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

function Post({postId, content, authorId, createdAt, updatedAt, likes, setAddNewPost, className}) {
	const [user, setUser] = useState({});
	const [isEdited, setIsEdited] = useState(false);
	const [contentState, setContentState] = useState(content);

    const isAuthenticated = useIsAuthenticated();
    const auth = useAuthUser();
    const { toast } = useToast();

	const authHeader = useAuthHeader();
	const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors, isValid },
    } = useForm();

    useEffect(() => {
		fetch(`http://localhost:3000/api/users/${authorId}`, {
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
			setUser(data);
		})
		.catch(error => {
			console.log(error.message);
			navigate("/");
		});

	}, [authorId]);


    const onSubmit = async (values) => {
        if (isValid) {
            console.log(values);
            fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "content": values.edited_content,
                })
            })
            .then(response => {

                return response.json();
            })
            .then(data => {
                if (data === "Content cannot exceed 2000 characters.") {
                    throw new Error(data);
                }

                toast({
                    title: "Hurrah!",
                    content: "Post updated correctly!",
                    className: "bg-green-800"
                })
                
                reset();
                setIsEdited(false);
                setAddNewPost(true);
                
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                })
                console.log(error);
            });

        } else {
            alert("INVALID");
        }
    };

    const deleteOnClick = () => {
        setAddNewPost(true);

        fetch(`http://localhost:3000/api/posts/${postId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
            cors: "no-cors"
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Błąd sieci!');
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
            toast({
                title: "Hurrah!",
                description: "Post deleted successfully!",
                className: "bg-green-800"
            })

		})
		.catch(error => {
			console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Failed to delete post!",
                description: error.message,
            })
		});
    };

    return (
        <Card className="mt-5 w-full">
            
                <CardHeader className="flex flex-row pb-1">
                    <Link to={`/profile/${user._id}`} className="flex flex-row">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                    
                        <div className="px-2 w-fit">
                            <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                            <CardDescription className="text-nowrap">{createdAt}</CardDescription>
                        </div>
                    </Link>

                    <div className="w-full flex flex-row justify-end items-center">
                        {/* <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="" className="w-[40px] cursor-pointer" /> */}
                        {authorId == auth._id ? (
                            <>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <><Icons.trashEmpty className="h-6 w-6 fill-gray-500 cursor-pointer hover:transition-all hover:fill-secondary"/></>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the post from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={deleteOnClick} >Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                
                                <Icons.edit onClick={() => setIsEdited(toggle => !toggle)} className="ml-2 h-6 w-6 fill-gray-500 cursor-pointer hover:transition-all hover:fill-secondary"/>
                                

                                {/* <Button variant="destructive">Delete</Button> */}
                                {/* <Button variant="secondary">Edit</Button> */}
                                {/* <Button onClick={deleteOnClick} variant="destructive">Delete</Button> */}
                            </>
                        ) : <></>}
                        
                    </div>
                </CardHeader>

                <CardContent className="mt-4">
                    {isEdited ? (
                        <Textarea
                            id="content"
                            placeholder="Tell us a little bit about yourself"
                            className="resize-y"
                            value={contentState}
                            onChangeCapture={e => setContentState(e.target.value)}
                            {...register("edited_content", {
                                required: "Content is required",
                            })}

                        />
                    ) : content}

                    {/* {content} */}
                    {/* <Skeleton className="w-full h-[500px] mt-4" /> */}
                    {/* <img src="https://picsum.photos/600/600" alt="" className="w-full"/> */}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                    <Reaction likes={likes} postId={postId} />
                    {isEdited ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            <Button type="submit">Save</Button> 
                        </form>
                    ) : null}
                </CardFooter>


            
        </Card>
    );
}

export default Post;
