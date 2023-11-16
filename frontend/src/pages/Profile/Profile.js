import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import { useUser } from "../../context/UserContext";
const Profile = () => {
  const { loggedUser, setLoggedUser } = useUser();
  const [userId, setUserId] = useState(loggedUser?.id);
  const [name, setName] = useState(loggedUser?.name);
  const [email, setEmail] = useState(loggedUser?.email);
  const [password, setPassword] = useState(loggedUser?.password);
  const [age, setAge] = useState(loggedUser?.age);
  const [gender, setGender] = useState(loggedUser?.gender);
  const [dob, setDob] = useState(loggedUser?.dob);
  const [mobile, setMobile] = useState(loggedUser?.mobile);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/auth/update", {
        userId,
        name,
        email,
        password,
        age,
        gender,
        dob,
        mobile,
      });

      console.log(response.data);
      setLoggedUser({
        id: response.data.updatedUser._id,
        name: response.data.updatedUser.name,
        email: response.data.updatedUser.email,
        age: response.data.updatedUser.age,
        dob: response.data.updatedUser.dob,
        gender: response.data.updatedUser.gender,
        mobile: response.data.updatedUser.mobile,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return loggedUser ? (
    <div className="user-form">
      <h2 className="heading">Update User Profile </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="reginp"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          {" "}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="reginp"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            className="reginp"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            className="reginp"
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="text"
            className="reginp"
            id="dob"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            className="reginp"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <button type="submit" className="regbtn">
          Update
        </button>
      </form>
    </div>
  ) : (
    <div>Loading....</div>
  );
};

export default Profile;
