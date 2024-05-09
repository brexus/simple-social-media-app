import { useForm } from "react-hook-form"
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate, Navigate, Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";

function Register() {

    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: {errors, isValid}
	} = useForm();

    const onSubmit = async (values) => {
        if(isValid) {
			
            try {
                const response = await fetch("http://localhost:5000/api/v1/auth/register", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: values.username,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        passwordRepeated: values.passwordRepeated,
                    })
                });

                const data = await response.json();

                if(!response.ok) {
                    throw new Error(data.message);
                }

                alert("Zarejestrowano pomyślnie!");
                console.log(data);

                navigate("/login");
                
            } catch (error) {
                alert(error.message);
            }
			
		} else {
            console.log("NOT VALID");
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
                            <CardTitle>Register</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                {/* USERNAME */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        placeholder="Username"
                                        {...register("username", {
                                            required: "Username is required",
                                            pattern: {
                                                value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
                                                message: "Username is not validated",
                                            },
                                        })}
                                    />
                                    <p className="text-red-500 h-1">{errors.username && errors.username.message}</p>
                                </div>

                                {/* FIRST NAME */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Nowak"
                                        {...register("firstName", {
                                            required: "First name is required",
                                            pattern: {
                                                value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
                                                message: "First name is not validated",
                                            },
                                        })}
                                    />
                                    <p className="text-red-500 h-1">{errors.firstName && errors.firstName.message}</p>
                                </div>

                                {/* LAST NAME */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Jan"
                                        {...register("lastName", {
                                            required: "Last name is required",
                                            pattern: {
                                                value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
                                                message: "Last name is not validated",
                                            },
                                        })}
                                    />
                                    <p className="text-red-500 h-1">{errors.lastName && errors.lastName.message}</p>
                                </div>
                                
                                {/* EMAIL */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
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

                                {/* PASSWORD */}
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

                                {/* REPEATED PASSWORD */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="passwordRepeated">Repeated password</Label>
                                    <Input 
                                        id="passwordRepeated" 
                                        type="password"
                                        placeholder="********"
                                        {...register("passwordRepeated", {
                                            required: "Repeated password is required",
                                            validate: value =>value === watch("password") || "The passwords do not match"
                                        })}
                                    />
                                    <p className="text-red-500">{errors.passwordRepeated && errors.passwordRepeated.message}</p>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex">
                            <Button className="w-full" type="submit" >Login</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>





            // <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            //     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            //             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            //                 Register your account
            //             </h1>
            //             <form
            //                 className="space-y-4 md:space-y-6"
            //                 onSubmit={handleSubmit(onSubmit)}
            //             >
            //                 <ModeToggle></ModeToggle>
            //                 {/* USERNAME */}
            //                 <div>
            //                     <label
            //                         htmlFor="username"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         Username
            //                     </label>
            //                     <input
            //                         type="text"
            //                         name="username"
            //                         id="username"

            //                         {...register("username", {
            //                             required: "Username is required",
            //                             pattern: {
            //                                 value: /^[a-zA-Z0-9]+$/,
            //                                 message: "Username is not validated",
            //                             },
            //                         })}

            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="Example"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.username && errors.username.message}</p>
            //                 </div>

            //                 {/* FIRST NAME */}
            //                 <div>
            //                     <label
            //                         htmlFor="firstName"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         First name
            //                     </label>
            //                     <input
            //                         type="text"
            //                         name="firstName"
            //                         id="firstName"

            //                         {...register("firstName", {
            //                             required: "First name is required",
            //                             pattern: {
            //                                 value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
            //                                 message: "First name is not validated",
            //                             },
            //                         })}

            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="Jan"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.firstName && errors.firstName.message}</p>
            //                 </div>

            //                 {/* LAST NAME */}
            //                 <div>
            //                     <label
            //                         htmlFor="lastName"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         Last name
            //                     </label>
            //                     <input
            //                         type="text"
            //                         name="lastName"
            //                         id="lastName"

            //                         {...register("lastName", {
            //                             required: "Last name is required",
            //                             pattern: {
            //                                 value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
            //                                 message: "Last name is not validated",
            //                             },
            //                         })}

            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="Nowak"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.lastName && errors.lastName.message}</p>
            //                 </div>
                            
            //                 {/* EMAIL */}
            //                 <div>
            //                     <label
            //                         htmlFor="email"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         Email
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
            //                     <p className="text-red-500 h-1">{errors.email && errors.email.message}</p>
            //                 </div>

            //                 {/* PASSWORD */}
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
            //                     <p className="text-red-500 h-1">{errors.password && errors.password.message}</p>
            //                 </div>

            //                 {/* PASSWORD */}
            //                 <div>
            //                     <label
            //                         htmlFor="passwordRepeated"
            //                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            //                     >
            //                         Repeat Password
            //                     </label>
            //                     <input
            //                         type="password"
            //                         name="passwordRepeated"
            //                         id="passwordRepeated"

            //                         {...register("passwordRepeated", {
            //                             required: "Repeated password is required",
            //                             validate: value =>value === watch("password") || "The passwords do not match"
            //                         })}

            //                         placeholder="••••••••"
            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.passwordRepeated && errors.passwordRepeated.message}</p>
            //                 </div>

            //                 {/* SUBMIT BUTTON */}
            //                 <button
            //                     type="submit"
            //                     className="w-full mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 py-2 px-6 font-dm text-base font-medium text-white *:transition-transform duration-200 ease-in-out hover:scale-[1.02] "
            //                 >
            //                     Register
            //                 </button>
            //                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            //                     Already have an account?{" "}
            //                     <Link
            //                         to="/login"
            //                         className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            //                     >
            //                         Sign in
            //                     </Link>
            //                 </p>
            //             </form>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Register;
