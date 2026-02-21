import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  // Fetching the Data
  
  useEffect(() => {
    axios.get("http://localhost:5000/data")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        alert("Deleted Successfully");

        
        setData(data.filter((item) => item._id !== id));
      })
      .catch(() => {
        alert("Error in Deleting");
      });
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Place</th>
              <th>Gender</th>
              <th>Phone No</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((obj) => (
              <tr key={obj._id}>
                <td>{obj.name}</td>
                <td>{obj.place}</td>
                <td>{obj.gender}</td>
                <td>{obj.phoneNo}</td>
                <td>{obj.dob ? obj.dob.slice(0, 10) : ""}</td>
                <td>{obj._id}</td>
                <td>
                  <button onClick={() => handleDelete(obj._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Home;
