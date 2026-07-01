import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">

      <div className="notfound-card">

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="home-btn">
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;