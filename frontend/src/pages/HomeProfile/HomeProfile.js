import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./HomeProfile.css";
const HomeProfile = () => {
  const { loggedUser } = useUser();
  const [logg, setLogg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLogg(loggedUser);
    console.log(loggedUser);
  }, []);

  const HandleSubmit = (e) => {
    e.preventDefault();
    navigate("/update");
  };

  return (
    <div className="userform">
      {logg.token !== "" ? (
        <>
          <h2 className="heading">User Profile</h2>
          <div className="details">
            <p>Name: {logg.name}</p>
            <p>Email: {logg.email}</p>
            <p>Age: {logg.age}</p>
            <p>DOB: {logg.dob}</p>
            <p>Gender: {logg.gender}</p>
            <p>Mobile: {logg.mobile}</p>
          </div>
          <button
            className="regbtn"
            onClick={(event) => {
              HandleSubmit(event);
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default HomeProfile;
