import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState(''); // Handles both username or email
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Mock successful login
        setSuccessMsg(true);

        // Redirect to dashboard after a brief delay
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="flex justify-center items-center font-sans mt-[-95px] pt-10 min-h-screen bg-[#f9f9f9]">
            <div className="w-full max-w-sm bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Welcome Back</h1>
                
                {successMsg && (
                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm text-center">
                        Login Successful! Redirecting...
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
                        <input 
                            type="text" 
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Enter username or email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#D92D20] text-white py-2 rounded-md font-medium hover:bg-red-700 transition"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#D92D20] font-semibold hover:underline">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
