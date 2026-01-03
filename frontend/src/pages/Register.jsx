import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input className="w-full border p-2 mb-3" placeholder="Name"
          onChange={e => setName(e.target.value)} />

        <input className="w-full border p-2 mb-3" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input type="password" className="w-full border p-2 mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
