import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./page.module.css";
import AuthServices from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [form_type, set_form_type] = useState<"login" | "signup">("login");
    const [form_data, set_form_data] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const { login, signup, auth_loading } = AuthServices();

    const navigate = useNavigate();
    const auth_data = JSON.parse(localStorage.getItem("auth") || "{}");

    useEffect(() => {
        // The check in useEffect is mostly fine, but let's ensure 'user' exists for rendering
        if (!!auth_data.user) {
            console.log("DAVddI")
            navigate("/profile");
        }
        console.log("DAVI")
        
    }, [auth_data]);

    // alterna entre login e signup
    const handle_change_form_type = () => {
        set_form_type((prev) => (prev === "login" ? "signup" : "login"));
        // limpa campos
        set_form_data({
            fullname: "",
            email: "",
            password: "",
            confirmpassword: "",
        });
    };

    // atualiza os valores digitados
    const handle_form_data_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        set_form_data((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // envia o formulário
    const handle_submit_form = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form_type === "login") {
            login(form_data);
        } else {
            if (form_data.password !== form_data.confirmpassword) {
                console.log("Password and Confirm Password do not match");
                return;
            }
            signup(form_data);
        }
    };

    // exibe "loading..." durante requisição
    if (auth_loading) return <h1>Loading...</h1>;

    return (
        <div className={styles.authPageContainer}>
            <h1>{form_type === "login" ? "Login" : "Signup"}</h1>

            <button onClick={handle_change_form_type}>
                {form_type === "login"
                    ? "Don't have an account? Click here"
                    : "Already have an account? Click here"}
            </button>

            <form onSubmit={handle_submit_form}>
                {/* fullname apenas no signup */}
                {form_type === "signup" && (
                    <TextField
                        required
                        label="Full name"
                        type="text"
                        name="fullname"
                        value={form_data.fullname}
                        onChange={handle_form_data_change}
                    />
                )}

                <TextField
                    required
                    label="Email"
                    type="email"
                    name="email"
                    value={form_data.email}
                    onChange={handle_form_data_change}
                />

                <TextField
                    required
                    label="Password"
                    type="password"
                    name="password"
                    value={form_data.password}
                    onChange={handle_form_data_change}
                />

                {/* confirm password apenas no signup */}
                {form_type === "signup" && (
                    <TextField
                        required
                        label="Confirm password"
                        type="password"
                        name="confirmpassword"
                        value={form_data.confirmpassword}
                        onChange={handle_form_data_change}
                    />
                )}

                <Button type="submit">
                    {form_type === "login" ? "Login" : "Signup"}
                </Button>
            </form>
        </div>
    );
}
