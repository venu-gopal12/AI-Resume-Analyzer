import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await register(name, email, password);
      navigate("/"); // ✅ go to login after register
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-700">
      <div 
        className={`w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-gray-100 
         transition-all duration-500 ease-out 
         hover:shadow-2xl hover:-translate-y-2
         ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
        `}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Create account</h2>
          <p className="text-sm text-gray-500 mt-2">Get started with our AI tools</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
           {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Full Name</label>
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              placeholder="John Doe"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email</label>
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              placeholder="name@company.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              placeholder="Create a strong password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-sm font-semibold text-white shadow-sm transition-all duration-300 transform 
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
              }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          
           <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
