import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    phoneNo: "",
    gender: "",
    dob: "",
    place: "",
    _id: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {



    if (!data.name || !data.phoneNo || !data._id) {
      setMsg("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add", data);

      setMsg("Data Added Successfully");

      // Reset form

      setData({
        name: "",
        phoneNo: "",
        gender: "",
        dob: "",
        place: "",
        _id: ""
      });

      setTimeout(() => {
        navigate("/");
      }, 800);

    } catch (error) {
      setMsg("Error in Adding Data");
      console.log(error);
    }
  };

  return (
    <div className="form">

      <h3 style={{ color: "green" }}>{msg}</h3>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={data.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phoneNo"
        placeholder="Enter Phone Number"
        value={data.phoneNo}
        onChange={handleChange}
      />

      <input
        type="email"
        name="_id"
        placeholder="Enter Email"
        value={data._id}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dob"
        value={data.dob}
        onChange={handleChange}
      />

      <select
        name="place"
        value={data.place}
        onChange={handleChange}
      >
        <option value="">Select Place</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Pune">Pune</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <div>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={data.gender === "male"}
          onChange={handleChange}
        /> Male

        <input
          type="radio"
          name="gender"
          value="female"
          checked={data.gender === "female"}
          onChange={handleChange}
        /> Female
      </div>

      <button onClick={handleSubmit}>Add</button>

    </div>
  );
};

export default Add;
