import React, { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/profile.context";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { profile, isLoading } = useContext(ProfileContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && profile) {
      navigate("/read-pdf-by-page");
    }
  }, [isLoading, profile, navigate]);

  return (
    <>{isLoading ? <p className="text-center ">Loading...</p> : children}</>
  );
};

export default PublicRoute;
