import axios from "axios";
import { useEffect, useState } from "react";


export function ViewUser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        if (res.status == 200) {
          const json = res.data;
          console.log(json);
          setData(json);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Code to fetch and display user data can be added here
  });

  return (
    <>
      <div className="container">
        <center><h1>User Table</h1></center> 
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr>
                  <td>{row.user_id}</td>
                  <td>{row.user_name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>{row.password}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}