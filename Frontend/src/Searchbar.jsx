import axios from 'axios'
import { useState } from 'react'

const Search = () => {

  const [id, setId] = useState("")
  const [obj, setObj] = useState(null)
  const [error, setError] = useState(false)

  const search = () => {

    if (!id) return alert("Enter email first")

    axios.get(`http://localhost:5000/search/${id}`)
      .then((res) => {
        setObj(res.data)
        setError(false)
      })
      .catch(() => {
        setObj(null)
        setError(true)
      })

    setId("")
  }

  return (
    <div className="search-box">

      {error && <h2 style={{ color: "red" }}>User Not Found</h2>}

      <input
        type='text'
        placeholder='Enter email'
        onChange={(e) => setId(e.target.value)}
        value={id}
      />

      <button onClick={search}>Search</button>

      {obj && (
        <div>
          <p>Name: {obj.name}</p>
          <p>E-mail: {obj._id}</p>
          <p>Phone-No: {obj.phno}</p>
          <p>Place: {obj.place}</p>
          <p>Gender: {obj.gen}</p>
          <p>DOB: {obj.dob?.slice(0,10)}</p>
        </div>
      )}

    </div>
  )
}

export default Search
