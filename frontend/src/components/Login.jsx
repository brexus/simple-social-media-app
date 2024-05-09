import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
    const isAuthenticated = useIsAuthenticated();
    const signIn = useSignIn();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        // watch,
        // reset,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        if (isValid) {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/v1/auth/login",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values),
                    }
                );

                const data = await response.json();
                console.log(values);

                signIn({
                    auth: { token: data.accessToken, type: 'Bearer' },
                    userState: {  
                        email: `${values.email}`,
                        uid: 123456
                    },
                });

                navigate("/");

            } catch (error) {
                console.log("Chyba niepoprawne dane logowania -> ", error.message);
            }
        } else {
            alert("INVALID");
        }

    };

    if (isAuthenticated()) {
        // If authenticated user, then redirect to secure dashboard

        return <Navigate to={"/"} replace />;
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-[100vh]">
                <Card className="w-[350px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input 
                                            id="email"
                                            type="email"
                                            placeholder="example@gmail.com" 
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                                                    message: "Email is not validated",
                                                },
                                            })}
                                        />
                                        <p className="text-red-500">{errors.email && errors.email.message}</p>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input 
                                            id="password" 
                                            type="password"
                                            placeholder="********"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Password must have at least 8 characters",
                                                },
                                            })}
                                        />
                                        <p className="text-red-500">{errors.password && errors.password.message}</p>

                                    </div>
                                </div>
                            
                        </CardContent>
                        <CardFooter className="flex">
                            <Button className="w-full" type="submit" >Login</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        );
    }
};

export default Login;




            // <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            //     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            //             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            //                 Sign in to your account
            //             </h1>
            //             <form
            //                 className="space-y-4 md:space-y-6"
            //                 onSubmit={handleSubmit(onSubmit)}
            //             >
            //                 <div>
            //                     <label
            //                         htmlFor="email"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         Your email
            //                     </label>
            //                     <input
            //                         type="email"
            //                         name="email"
            //                         id="email"
            //                         {...register("email", {
            //                             required: "Email is required",
            //                             pattern: {
            //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
            //                                 message: "Email is not validated",
            //                             },
            //                         })}
            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="name@company.com"
            //                         required=""
            //                     />
            //                     <p className="text-red-500">{errors.email && errors.email.message}</p>
            //                 </div>
            //                 <div>
            //                     <label
            //                         htmlFor="password"
            //                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            //                     >
            //                         Password
            //                     </label>
            //                     <input
            //                         type="password"
            //                         name="password"
            //                         id="password"
            //                         {...register("password", {
            //                             required: "Password is required",
            //                             minLength: {
            //                                 value: 8,
            //                                 message:
            //                                     "Password must have at least 8 characters",
            //                             },
            //                         })}
            //                         placeholder="••••••••"
            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         required=""
            //                     />
            //                     <p className="text-red-500">{errors.password && errors.password.message}</p>
            //                 </div>
            //                 <button
            //                     type="submit"
            //                     className="w-full mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 py-2 px-6 font-dm text-base font-medium text-white *:transition-transform duration-200 ease-in-out hover:scale-[1.02] "
            //                 >
            //                     Sign in
            //                 </button>
            //                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            //                     Don’t have an account yet?{" "}
            //                     <Link
            //                         to="/register"
            //                         className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            //                     >
            //                         Register
            //                     </Link>
            //                 </p>
            //             </form>
            //         </div>
            //     </div>
            // </div>
