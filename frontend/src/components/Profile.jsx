import Navbar from "./Navbar";

function Profile() {
    return (
        <div className="flex flex-col w-full">
			<Navbar />
			<main className="flex flex-col justify-center items-center">
				<h1>AUTORYZOWANA STRONA</h1>
				<h3 className="font-black text-2xl">PROFIL</h3>
			</main>
        </div>
    );
}

export default Profile;
