import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../services/profileServices";

function Profile() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(id)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response.data.error));
  }, [id]);
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Link className="back-btn" to={"/profiles"}>
          Go Back
        </Link>
      </div>
      {Object.keys(data).length === 0 ? (
        error ? (
          <div style={{ width: "100%" }}>
            <pre style={{ fontSize: "20px", textAlign: "center" }}>{error}</pre>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <pre style={{ fontSize: "20px", textAlign: "center" }}>
              Loading...
            </pre>
          </div>
        )
      ) : (
        <div className="particular-profile-card">
          <div className="particular-profile-card-left">
            {" "}
            <img src={data.image} />
            <h1>
              {data.name}, <span>{data.species}</span>
            </h1>
            <h2>{data.gender}</h2>
            <h2>{data.location?.name}</h2>
            <h2 className={data.status}>{data.status}</h2>
            {/* <p> */}{" "}
            <a
              // style={{ color: "white", textDecoration: "none" }}
              href={data.url}
              target="_blank"
            >
              Click Here!
            </a>
            {/* </p> */}
          </div>
          <div className="particular-profile-card-right">
            <h1>Episode List</h1>
            {data?.episode?.map((item) => (
              <a className="episode-link" href={item} target="_blank">
                {" "}
                {item}
              </a>
            ))}
            {/* <p> */}
            <a className="a-link" href={data.url} target="_blank">
              Click Here!
            </a>
            {/* </p>   */}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
