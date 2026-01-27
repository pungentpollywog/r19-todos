import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";


export default function ProtectedRoute({children}) {
  const [authDetails] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authDetails) {
      navigate('/login');
    }
  }, [authDetails])

  return children; 
}