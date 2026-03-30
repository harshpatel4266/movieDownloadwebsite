import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handelclick = (e) => {
    e.preventDefault();
    let eml = email.current.value;
    let pwd = password.current.value;
    const formdata = new FormData();
    formdata.append("email", eml);
    formdata.append("password", pwd);

    axios
      .post("http://localhost:5000/user/login", formdata)
      .then((res) => {
        if (res.status == 200) {
          const json = res.data;
          console.log(json);
          if (json.status == "success") {
            alert(" Login Succsessfully.");
            localStorage.setItem("islogin", "true");
            setTimeout(() => {
              navigate("/");
            }, 500);
          } else {
            alert("Enter Valid Details");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cover">
      <div className="login-container">
        {/* Back Button */}
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="form">
          <form onSubmit={handelclick}>
            <h3 className="title">LOGIN</h3>

            <table className="tbl">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="email" id="lbl">
                      EMAIL
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
                    <label htmlFor="password" id="lbl">
                      PASSWORD
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

                <tr>
                  <td>
                    <label>
                      <input type="checkbox" /> Remember me
                    </label>
                  </td>
                  <td>
                    <label id="fpass">Forget password?</label>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button type="submit" className="btn">
                      Login
                    </button>
                    <label id="account"> Don't have an account? </label>
                    <a href="/register" className="register">
                      Register
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
