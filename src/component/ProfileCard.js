import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

ProfileCard.propTypes = {
  data: PropTypes.array,
};

function ProfileCard({ data }) {
  const navigate = useNavigate();

  return (
    <>
      {data.map((item) => (
        <>
          <div
            class="profile-card"
            onClick={() => navigate(`/profiles/${item.id}`)}
          >
            <header>
              <img src={item.image} alt={item.name} />

              <h1>{item.name}</h1>
              <h2>{item.type}</h2>

              <h2>
                <span className="title">Location :</span> {item.location.name}
              </h2>
              <h2>
                <span className="title">Total Episode :</span>{" "}
                {item.episode.length}
              </h2>
            </header>
          </div>
        </>
      ))}
    </>
  );
}

export default ProfileCard;
