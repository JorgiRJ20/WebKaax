import React from "react";
import { useNavigate } from "react-router-dom";


export const Error404 = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    return (
        <div>
            <h1>Error 404</h1>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>Iniciar sesión</button>
        </div>
    )
}