import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

function Login() {
  const [email, setEmail] = useState('Shayesteh@gmail.com');
  const [password, setPassword] = useState('123456');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="p-8 my-8 mx-auto shadow-xl  max-w-[25rem] rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="bg-slate-100 rounded-2xl p-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="bg-slate-100 rounded-2xl p-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button className="primaryBtn w-full p-4">Login</button>
      </form>
    </div>
  );
}
export default Login;
