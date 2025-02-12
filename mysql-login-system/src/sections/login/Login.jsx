import { useState } from "react";
import axios from "axios";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", {email, password});
            setMessage(res.data.message);
        } catch (err) {
            setMessage("Error to make login...");
        }
    }

    return(
        <>
            <div className="bg-dark text-bg-dark">
                <div className="container p-3">
                    <h2 className="">Login:</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                        {message && <p className="text-danger">{message}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}

// 