import { useState } from "react";
import axios from "axios";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/register", {email, password});
            setMessage(res.data.message);
        } catch (err) {
            setMessage("Error during registration...")
        }
    };

    return(
        <>
            <div className="bg-primary text-bg-dark">
                <section className="container p-3">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <input
                            type="email" placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign Up</button>
                        {message && <p className="text-white">{message}</p>}
                    </form>
                </section>
            </div>
        </>
    )
}