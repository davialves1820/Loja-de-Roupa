import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth";


export default function Profile() {
    const { logout } = AuthServices();
    const navigate = useNavigate();
    // Ensure the data is correctly parsed and defaults to an empty object
    const auth_data = JSON.parse(localStorage.getItem("auth") || "{}");
    const user = auth_data.user; // Get the user object

    useEffect(() => {
        // The check in useEffect is mostly fine, but let's ensure 'user' exists for rendering
        if (!user) {
            navigate("/auth");
        }
        
    }, [user]);
    
    // Check if user exists before trying to access its properties
    if (!user) {
        // Or you can return null/loading state if navigation hasn't kicked in yet
        return null; 
    }

    const handle_logout = () => {
        logout();
        navigate("/");
    }
    
    return (
        <>
        <h1>Welcome, {user.fullname}</h1> 
        <h3>{user.email}</h3>
        <button onClick={handle_logout}>Logout</button>
        </>
        
    )
}