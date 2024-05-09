import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useState, useEffect } from 'react';
import { Icons } from "@/components/icons";

import { Button } from "@/components/ui/button";
import Post from "@/components/Post/Post";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {useInView} from "react-intersection-observer";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [postsData, setPostsData] = useState([]);
	const [addNewPost, setAddNewPost] = useState(false);

	const authHeader = useAuthHeader();

	useEffect(() => {
		setIsLoading(true);
		setAddNewPost(false);

		fetch("http://localhost:3000/api/posts", {
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
			
			setPostsData(data);
			setIsLoading(false);
		})
		.catch(error => {
			console.log(error);
		});
		
	}, [addNewPost]);

	return (
        <MainContainer type="feed" setAddNewPost={setAddNewPost}>

			{isLoading == true ? (
				<Card className="mt-5 w-full">
					<CardHeader className="flex flex-row">
						<Skeleton className="h-12 w-12 rounded-full" />
						<div className="px-2 w-fit">
							<Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px] mt-2" />
						</div>
					</CardHeader>
					<CardContent>
						<Skeleton className="h-6 w-full mb-5" />
						<Skeleton className="h-6 w-[50%] mb-5" />
						{/* <Skeleton className="w-full h-[500px]" /> */}
					</CardContent>
					<CardFooter className="flex justify-between">
						{/* <Button variant="outline">Likes</Button>
						<Button variant="outline">Comments</Button> */}

						<div className="flex flex-row gap-3">
							<Skeleton className="h-8 w-20 mb-5" />
						</div>
					</CardFooter>
				</Card>

			) : (
				<>
					{postsData.map((post, i) => (
						<Post
							key={post._id}
							postId={post._id}
							content={post.content}
							authorId={post.author}
							createdAt={post.createdAt}
							updatedAt={post.updatedAt}
							likes={post.likes}
							setAddNewPost={setAddNewPost}
							// hearts={post.hearts}
						/>
					))}
				</>
			)}

			{/* {hasNextPage && <div ref={ref} className=""></div>} */}

        </MainContainer>
    )
}

export default Home;
