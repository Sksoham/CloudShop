import { FaUserCircle, FaEnvelope, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-card">

        <FaUserCircle className="profile-avatar" />

        <h1>My Profile</h1>

        <div className="profile-info">

          <div className="profile-row">
            <FaUser />
            <span>Name</span>
            <strong>{user?.name}</strong>
          </div>

          <div className="profile-row">
            <FaEnvelope />
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

        </div>

        <button className="profile-btn">
          Edit Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;