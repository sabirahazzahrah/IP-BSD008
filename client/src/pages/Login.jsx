import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const BASE_URL = "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // handle login, dapatin akses token dari sini
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      console.log(res.data.data.access_token);
      const token = res.data.data.access_token;
      console.log(token);
      localStorage.setItem("access_token", token);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Lakukan pengambilan token dari Google (gunakan Google Sign-In atau library OAuth2 di frontend)
      const googleToken = "YOUR_GOOGLE_TOKEN"; // Gantilah dengan token yang diperoleh dari Google

      // Panggil endpoint `googleLogin` di backend dengan token dari Google menggunakan axios
      const response = await axios.post(
        "http://localhost:3000/googleLogin",
        { token: googleToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const data = response.data;
        setAccessToken(data); // Atur token akses ke state atau lakukan apa yang diperlukan
      } else {
        console.error("Failed to login with Google");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="w-full  max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form
          novalidate=""
          action=""
          className="space-y-6"
          onSubmit={handleLogin}
        >
          <div className="space-y-1 text-sm">
            <label for="email" className="flex dark:text-gray-400">
              Email
            </label>
            <input
              type="text"
              value={email}
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label for="password" className="flex dark:text-gray-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm dark:text-gray-900 dark:bg-violet-400"
          >
            Submit
          </button>
          <button
            onClick={handleGoogleLogin}
            className="block w-full p-3 text-center rounded-sm dark:text-gray-900 dark:bg-violet-400"
          >
            login with google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
