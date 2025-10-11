import { useState } from "react";

export default function AuthServices() {
    const [auth_loading, set_auth_loading] = useState(false);

    const url = "http://localhost:3000/auth";

    const login = async (form_data: any) => {
        set_auth_loading(true);

        fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(form_data)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            
            if (result.success && result.body.token) {
                localStorage.setItem("auth", JSON.stringify({ token: result.body.token, user: result.body.user }));
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        .finally(() => {
            set_auth_loading(false);
        })
    }

    const logout = async () => {
        localStorage.removeItem("auth");
    }

    const signup = async (form_data: any) => {
        set_auth_loading(true);

        fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(form_data)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if (result.success && result.body.token) {
                localStorage.setItem("auth", JSON.stringify({ token: result.body.token, user: result.body.user }));
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        .finally(() => {
            set_auth_loading(false);
        })
    }

    return { signup, login, logout, auth_loading };
}