import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate, Link } from "react-router-dom";

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
import MainContainer from "@/components/MainContainer/MainContainer";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const Login = () => {
    const isAuthenticated = useIsAuthenticated();
    const signIn = useSignIn();
    const navigate = useNavigate();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        // watch,
        // reset,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        console.log(values);
        if (isValid) {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/login",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values),
                    }
                );

                const data = await response.json();
                // console.log(values);
                
                if(response.status === 400) {
                    if(data === "The password is incorrect") {
                        throw new Error(data);
                    } else if (data === "No record existed") {
                        throw new Error("The user with this email address does not exist");
                    } else {
                        throw new Error(data);
                    }
                }

                signIn({
                    auth: { token: data.token, type: 'Bearer' },
                    userState: {
                        _id: `${data.userData._id}`,
                        firstName: `${data.userData.firstName}`,
                        lastName: `${data.userData.lastName}`,
                        email: `${values.email}`,
                    },
                });

                toast({
                    title: "Hurrah!",
                    description: "Successfully logged in!",
                    className: "bg-green-800"
                })

                navigate("/");

            } catch (error) {

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                })
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
            <MainContainer>
                <div className="h-screen flex justify-center items-center">
                    <Card className="max-w-full w-[400px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardHeader>
                                <CardTitle className="mt-8 scroll-m-20 text-2xl font-bold tracking-tight">Login</CardTitle>
                                <CardDescription>Enter your details to log in!</CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="email" className={cn(errors.email ? "text-red-500" : "text-foreground")}>Email</Label>
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
                                            <p className="text-red-500 h-2 text-xs">{errors.email && errors.email.message}</p>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="password" className={cn(errors.password ? "text-red-500" : "text-foreground")}>Password</Label>
                                            <Input 
                                                id="password" 
                                                type="password"
                                                placeholder="********"
                                                {...register("password", {
                                                    required: "Password is required",
                                                })}
                                            />
                                            <p className="text-red-500 h-2 text-xs">{errors.password && errors.password.message}</p>

                                        </div>

                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Don’t have an account yet? <Link to="/register" className="font-medium text-primary hover:underline dark:text-primary">Sign up</Link>
                                        </p>
                                    </div>
                            </CardContent>
                            
                            <CardFooter className="flex flex-col">
                                <Button className="w-full" type="submit" >Login</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </MainContainer>
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
