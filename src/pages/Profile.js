import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../services/profileServices";

function Profile() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    getProfile(id)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response.data.error));
  }, [id]);
  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
            <p>Click Here!</p>
          </div>
          <div className="particular-profile-card-right">
            <h1>Episode List</h1>
            {data?.episode?.map((item) => (
              <a href={item} target="_blank">
                {" "}
                {item}
              </a>
            ))}
            <p>Click Here!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
