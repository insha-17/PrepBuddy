import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) return;

            try {

                const data = await getCurrentUser();

                setUser(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchUser();

    }, []);

    return (

        <AuthContext.Provider value={{ user, setUser }}>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}