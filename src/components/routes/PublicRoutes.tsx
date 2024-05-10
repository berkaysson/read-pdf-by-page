import React, { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/profile.context";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  // Accessing profile and isLoading state from the ProfileContext
  const { profile, isLoading } = useContext(ProfileContext);

  // Hook from React Router DOM to navigate between routes
  const navigate = useNavigate();

  // Effect to redirect authenticated users away from public routes
  useEffect(() => {
    // If data is loaded and a user profile exists (user is authenticated)
    if (!isLoading && profile) {
      // Redirect authenticated users to the home route ("/")
      navigate("/read-pdf-by-page");
    }
  }, [isLoading, profile, navigate]); // Dependency array to trigger the effect

  // Conditional rendering based on loading state
  return (
    <>{isLoading ? <p className="text-center ">Loading...</p> : children}</>
  );
};

export default PublicRoute;
