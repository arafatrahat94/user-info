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
  const [userLoading, setUserLoading] = useState(false);
  const handleLoadData = (id) => {
    setUserLoading(true);
    axios
      .get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`)
      .then((res) => {
        setTimeout(() => {
          setUserLoading(false);
        }, 500);
        setUserData(res.data);
        console.log(res.data);
      });
  };
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
          <h1 className="fs-3 mt-5 mb-2 text-center">User Info</h1>
          <div style={{ maxWidth: "1200px", margin: "auto" }}>
            <div className="row p-5">
              <div
                style={{ height: "80vh", overflow: "auto" }}
                className="col example"
              >
                <h1 className="fs-5">User :</h1>
                {user.length > 0 &&
                  user.map((x, i) => (
                    <>
                      <div
                        onClick={() => handleLoadData(x.id)}
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
                              {x.avatar.includes(
                                "https://cdn.fakercloud.com/"
                              ) ? (
                                <h1
                                  style={{
                                    objectFit: "cover",
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="fs-6 border  text-center"
                                >
                                  no img
                                </h1>
                              ) : (
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
                              )}
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
              <div
                style={{ height: "82vh", overflow: "auto" }}
                className="col example border rounded-4"
              >
                <h1 className="fs-5 p-3">User Details :</h1>
                {!userData && !userLoading && (
                  <h1
                    style={{
                      color: "blue",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "80vh",
                    }}
                    className="fs-6"
                  >
                    {" "}
                    {"Select An User To View Details"}
                  </h1>
                )}
                {userLoading && userData ? (
                  <div
                    style={{ height: "80vh" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div
                      className="spinner-border text-primary spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mx-4">
                      <div>
                        {userData?.avatar?.includes(
                          "https://cdn.fakercloud.com/"
                        ) ? (
                          <h1 className="fs-4 mt-5 p-3 text-center">
                            Profile Image Not Found
                          </h1>
                        ) : (
                          <img
                            style={{ width: "40%" }}
                            className="mt-5 mx-auto d-block rounded-5 shadow shadow-sm"
                            src={userData?.avatar}
                            alt=""
                          />
                        )}
                        <h1 className="mt-3 fs-4">
                          Name :{" "}
                          {userData?.profile?.firstName +
                            " " +
                            userData?.profile?.lastName}
                        </h1>
                        <h3 className="mt-3 fs-5 fw-normal">
                          Id : {userData?.id}
                        </h3>
                        <h3 className="mt-3 fs-5 fw-normal">
                          Bio : {userData?.Bio}
                        </h3>
                        <h3 className="mt-3 fs-5 fw-normal">
                          JobTitle : {userData?.jobTitle}
                        </h3>
                        <h3 className="mt-3 fs-5 fw-normal">
                          email : {userData?.profile?.email}
                        </h3>
                        <h3 className="mt-3 fs-5 fw-normal">
                          username : {userData?.profile?.username}
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
