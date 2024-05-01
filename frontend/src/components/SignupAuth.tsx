import { SignUpvalidation } from "@hardy18/medium-common-snippets";
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const SignupAuth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setpostInputs] = useState<SignUpvalidation>({
        name: "",
        email: "",
        password: "",
    });
const navigate=useNavigate();
    //function to signup or signin
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`, postInputs);
            const jwtToken = response.data;
            localStorage.setItem("jwtToken", jwtToken);
            navigate("/blog");

        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">

                        <div className="text-3xl font-extrabold mt-4">
                            {type === "signup" ? "Create an Account" : "Login to your Account"}
                        </div>
                        <div className="text-slate-400">
                            {type == "signup" ? "Already Have an account?" : "Don't Have an account?"} <Link to={type === "signup" ? "/signin" : "/signup"} className="text-slate-400 pl-2 underline">{type === "signup" ? "Login" : "Signup"}</Link>
                            {/* Already Have an account? <Link to="/signin" className="text-slate-400 pl-2 underline">Login</Link>} */}
                        </div>
                        <div className="pt-2">


                            {type === "signup" ? <InputLabel label="Name" placeholder="Narendra Modi" onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                })
                            }} /> : null}

                            <InputLabel label="Email" placeholder="gmail.com" onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    email: e.target.value
                                })
                            }} />
                            <InputLabel label="Password" type="password" placeholder="*******" onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    password: e.target.value
                                })
                            }} />
                        </div>
                        <div className="pt-4">

                            <button onClick={sendRequest} type="button" className="text-white w-full  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup" : "Signin"}</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}



interface InputLabelProps {
    label: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}
function InputLabel({ label, placeholder, onChange, type }: InputLabelProps) {
    return (
        <div>
            <label htmlFor={label} className="block mb-2 text-md font-medium text-gray-900 font-semibold pt-5 ">{label}</label>
            <input type={type || "text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 " placeholder={placeholder} onChange={onChange} required />
        </div>
    )
}