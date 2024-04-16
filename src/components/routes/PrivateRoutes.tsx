import React, { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/profile.context";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { profile, isLoading } = useContext(ProfileContext);

  const navigate = useNavigate();

  // Effect to redirect unauthenticated users to the signin route
  useEffect(() => {
    // If data is loaded and no user profile exists (user is not authenticated)
    if (!isLoading && !profile) {
      // Redirect unauthenticated users to the signin route ("/signin")
      navigate("/read-pdf-by-page/login");
    }
  }, [isLoading, profile, navigate]); // Dependency array to trigger the effect

  // Conditional rendering based on loading state
  return <>{isLoading ? <p>Loading...</p> : children}</>;
};

export default PrivateRoute;
