import Navbar from "../../components/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function Profile() {
	const { userId } = useParams();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	
	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState("");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3000/api/users/${userId}`, {
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
			console.log("Profil wczytano poprawnie!");
			setUserData(data);
			setIsLoading(false);
			
		})
		.catch(error => {
			console.log(error.message);
			console.error('Wystąpił błąd podczas wczytywania profilu użytkownika:', error);
			navigate("/");
		});

	}, [userId]);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	fetch("http://localhost:5000/api/v1/posts/feed?feedType=home&pageSize=10&pageNumber=0", {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json', 
	// 			"Authorization": authHeader,
	// 		},
	// 	})
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error('Błąd sieci!');
	// 		}
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		setPosts(data.content);
	// 		setIsLoading(false);
	// 	})
	// 	.catch(error => {
	// 		console.log(error.message);
	// 		navigate("/");
	// 	});

	// }, []);

    return (
        <MainContainer type="profile">

			<div className="relative flex flex-col justify-center items-center">
				<Skeleton className="h-[180px] w-[100vw]" />

				{/* {isLoading ? (
					<Skeleton className="h-[200px] w-[2000px] " />
				) : (
					<img src="https://picsum.photos/2000/300" alt="" className="w-full"/>
				)} */}

				<Avatar className="absolute w-[90px] h-[90px] border-primary border-4 bottom-[-50px]">
					<AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>


			<div className="max-w-full w-[700px] flex flex-col justify-center items-center pt-14">

				<div className="flex flex-col justify-center items-center">
					<h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl pt-1">
						{isLoading ? <Skeleton className="h-[30px] w-[200px] " /> : (
							<>
								{userData.firstName} <span className="text-primary">{userData.lastName}</span>
							</>
						)}
					</h2>

					{/* <p>{userData.about}</p> */}
				</div>

			</div>
        </MainContainer>
    );
}

export default Profile;
