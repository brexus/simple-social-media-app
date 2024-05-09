import React from 'react'
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AddPost from "@/components/AddPost/AddPost";
import Pins from "@/components/Pins/Pins";

function MainContainer({children, type = "default", setAddNewPost}) {
    return (
        <div className="flex flex-col items-start min-h-screen">
            <Navbar />

            <main className="w-full flex flex-col justify-center items-center">
                {type == "feed" ? (
                    <div className="max-w-full w-[700px]">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl py-5">
                            Home
                        </h2>
                        {/* <Pins /> */}
                        <AddPost setAddNewPost={setAddNewPost}/>
                        {children}
                    </div>
                    
                ) : null}

                {type == "profile" ? (
                    <div className="max-w-full flex flex-col justify-center items-center">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl py-5">
                            Profile
                        </h2>
                        {children}
                    </div>
                ) : null}

                {type == "default" ? (
                    <div className="max-w-full w-[700px] flex flex-col justify-center items-center">
                        {children}
                    </div>
                ) : null}


            </main>

            <Footer />
        </div>
    )
}

export default MainContainer;
