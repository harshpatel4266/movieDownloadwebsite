import React, { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
  const username = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handelclick = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("username", username.current.value);
    formdata.append("email", email.current.value);
    formdata.append("phone", phone.current.value);
    formdata.append("password", password.current.value);

    axios
      .post("http://localhost:5000/user/signup", formdata)
      .then((res) => {
        if (res.status === 200) {
          const json = res.data;

          if (json.status === "success") {
            alert("Register Successfully");
            resetForm();
            navigate("/");
          } else {
            alert("Something Went Wrong!");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Server Error");
      });
  };

  const resetForm = () => {
    username.current.value = "";
    email.current.value = "";
    phone.current.value = "";
    password.current.value = "";
  };

  return (
    <div className="cover2">
      <div className="container-register">
        <div className="form">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <form onSubmit={handelclick}>
            <h3 className="title">Registration</h3>

            <table className="tbl">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="username" id="lbl1">
                      Username
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="username"
                      ref={username}
                      className="txt"
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="email" id="lbl2">
                      Email
                    </label>
                  </td>
                  <td>
                    <input
                      type="email"
                      id="email"
                      ref={email}
                      className="txt"
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="phone" id="lbl2">
                      Phone
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="phone"
                      ref={phone}
                      className="txt"
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="password" id="lbl3">
                      Password
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      id="password"
                      ref={password}
                      className="txt"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <button type="submit" className="btn1">
              Sign Up
            </button>

            <div className="forget">
              <h5>Already have an account?</h5>
              <span onClick={() => navigate("/Login")}>Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
