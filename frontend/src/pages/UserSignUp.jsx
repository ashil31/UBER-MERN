import React, { useContext, useState } from "react";
import logo from "../assets/uber_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      setUser(data);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }


    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-6 flex flex-col justify-between h-screen">
      {/* login User page */}
      <div>
        <img src={logo} className="w-20 mb-6" alt="" />
        <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-2">What's your name?</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="first name"
              autoComplete="given-name"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            />
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="last name"
              autoComplete="family-name"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your email?</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-5 border w-full text-base placeholder:text-sm"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-7 border w-full text-base placeholder:text-sm"
          />

          <button className="bg-[#111] text-white font-semibold rounded-xl px-4 py-2 mb-3 w-full text-lg">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already Registered?{" "}
          <Link to="/login" className="text-blue-600">
            Sign In
          </Link>{" "}
        </p>
      </div>
      {/* login Captain button */}
      {/* <div className="relative pt-10 text-[10px] leading-tight flex gap-2">
        <input type="checkbox" name="" id="" className="absolute top-0 left-0"/>
        <p className="absolute top-0 left-5">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div> */}
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
