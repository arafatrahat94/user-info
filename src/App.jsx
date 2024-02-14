import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState([]);
  useEffect(() => {
    axios
      .get(`https://602e7c2c4410730017c50b9d.mockapi.io/users`)
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        setuser(res.data);
        console.log(res.data);
      });
  }, []);
  const [userData, setUserData] = useState(null);
  const handleLoadData = (id) => {};
  return (
    <>
      {loading ? (
        <h1>
          <div
            style={{ height: "100vh" }}
            className="d-flex justify-content-center align-items-center"
          >
            <div
              className="spinner-border text-primary spinner-border-sm"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </h1>
      ) : (
        <div>
          <h1 className="fs-3 my-2 text-center">User Info</h1>
          <div style={{ maxWidth: "1200px", margin: "auto" }}>
            <div className="row p-5">
              <div
                style={{ height: "100vh", overflow: "auto" }}
                className="col example"
              >
                {user.length > 0 &&
                  user.map((x, i) => (
                    <>
                      <div
                        key={i}
                        className="card my-2 rounded-3 shadow shadow-sm"
                      >
                        <div className="card-body">
                          <div className="row">
                            <div
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                              }}
                              className="  me-3"
                            >
                              <img
                                style={{
                                  objectFit: "cover",
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "50%",
                                }}
                                src={x?.avatar}
                                alt=""
                              />
                            </div>
                            <div className="col">
                              <h5 className="card-title">
                                {x.profile.firstName + " " + x.profile.lastName}
                              </h5>
                              <p className="card-text">{x.jobTitle}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <div className="col">
                {!userData && "Select An User To View Details"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
