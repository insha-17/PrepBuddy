import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginUser } from "../../services/authService";

function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

const handleLogin = async () => {
    console.log("Login button clicked");

    try {
        const response = await loginUser(loginData);

        console.log(response);

        localStorage.setItem("token", response.token);

        navigate("/dashboard");
    } catch (error) {
        console.error(error);
        alert("Login Failed");
    }
};

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-600">
                    PrepBuddy
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Welcome Back 👋
                </p>

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleChange}
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                />

                <Button
                    text="Login"
                    onClick={handleLogin}
                />

            </div>

        </div>
    );
}

export default Login;