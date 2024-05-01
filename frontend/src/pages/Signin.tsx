import { SignupAuth } from "../components/SignupAuth"
import { Signup_quote } from "../components/Signup_quote"

export const Signin = () => {   
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SignupAuth type="signin"/>
            </div>
            <div className="none md:block">
                <Signup_quote/>
            </div>
        </div>
    )
}