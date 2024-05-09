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
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from 'react-router-dom';

import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

import { Icons } from "@/components/icons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function AddPost({setAddNewPost}) {
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
    const { toast } = useToast();

    const auth = useAuthUser();

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors, isValid },
    } = useForm();
    const onSubmit = async (values) => {
        if (isValid) {
            try {

                const response = await fetch("http://localhost:3000/api/posts", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        "Authorization": authHeader,
                    },
                    body: JSON.stringify({
                        "author": auth._id,
                        "content": values.content,
                    })
                });

                const data = await response.json();

                if(response.status === 400) {
                    if(data === "Content cannot exceed 2000 characters.") {
                        throw new Error(data);
                    } else {
                        throw new Error(data);
                    }
                }


                toast({
                    title: "Hurrah!",
                    content: "Post added correctly!",
                    className: "bg-green-800"
                })
                
                reset();

                setAddNewPost(true);
                    
            
            } catch(error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                });
                
            }

        } else {
            console.log("what");
        }
    };

    return (
        <Card className="mt-5 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* <CardHeader className="flex flex-col p-3"></CardHeader> */}
                
                <CardContent className="flex flex-row items-center w-full pt-5"> 
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    <div className="w-full ml-4">
                        <Textarea
                            id="content"
                            placeholder="Tell us a little bit about yourself"
                            className="resize-y"

                            {...register("content", {
                                required: "Content is required",
                            })}

                        />
                        {errors.content && errors.content.type === "required" && (
                            <p className="text-red-500 text-sm">Content is required!</p>
                        )}
                    </div>
                </CardContent>


                <CardFooter className="flex justify-center items-center gap-4">
                    {/* <Button variant="secondary" className="w-fit text-foreground"><Icons.imageAdd className="h-6 w-6 fill-foreground mr-1"/>Add photo</Button> */}
                    <Button variant="default" type="submit" className="w-fit bg-primary text-foreground"><Icons.send className="h-6 w-6 fill-foreground mr-1"/>Add post</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default AddPost
