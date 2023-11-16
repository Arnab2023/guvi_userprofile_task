import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoggedUser } = useUser();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8001/auth/login", {
        email,
        password,
      });
      setLoggedUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        age: data.user.age,
        dob: data.user.dob,
        gender: data.user.gender,
        mobile: data.user.mobile,
        token: data.user.token,
      });
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};
const Form = ({ email, setEmail, password, setPassword, label, onSubmit }) => {
  return (
    <div className="auth-body">
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2 className="heading">LOGIN</h2>
          <div className="form-group">
            <label htmlFor="email" className="reg-text">
              Email
            </label>
            <input
              className="reginp"
              type="email"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="reg-text">
              Password
            </label>
            <input
              className="reginp"
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="regbtn">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
