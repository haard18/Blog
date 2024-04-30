import { SignupAuth } from "../components/SignupAuth"
import { Signup_quote } from "../components/Signup_quote"

export const Signup = () => {   
    return (
        <div className="grid grid-cols-2">
            <div>
                <SignupAuth/>
            </div>
            <div className="invisible md:visible">
                <Signup_quote/>
            </div>
        </div>
    )
}