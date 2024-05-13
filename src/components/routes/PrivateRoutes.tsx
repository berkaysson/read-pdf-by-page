import React, { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/profile.context";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { profile, isLoading } = useContext(ProfileContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !profile) {
      navigate("/read-pdf-by-page/login");
    }
  }, [isLoading, profile, navigate]);

  return (
    <>{isLoading ? <p className="text-center ">Loading...</p> : children}</>
  );
};

export default PrivateRoute;
