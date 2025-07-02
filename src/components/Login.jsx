import { useState, useEffect } from "react";

export default function Login() {
    const [user, setUser] = useState({email: "", password: ""});

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            const response = await fetch('http://localhost:4000/api/auth/login', requestOptions);
            const data = await response.json();

            if(response.ok) {
                localStorage.setItem('token', data.token);
                console.log(localStorage.getItem('token'));
            } else {
                console.error(data.message || "Login failed.");
            }
        } catch(err) {
            console.error("Error logging in:", err);
        }        
    }

    const style = {
        padding: "5px 2px",
    }

    const button = {
        padding: "10px 30px",
        border: "none",
        background: "blue",
        color: "white",
        borderRadius: "5px",
        marginTop: "5px",
        cursor: "pointer"
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label> <br />
                <input style={style} type="email" name="email" id="email" placeholder="example@gmail.com" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})}/><br />
                <label htmlFor="password">Password</label><br />
                <input style={style} type="password" name="password" id="password" placeholder="*******" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})}/><br />
                <button style={button} type="submit">Login</button>
            </form>
        </div>
    )
}
