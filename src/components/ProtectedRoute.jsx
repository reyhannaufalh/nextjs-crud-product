import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
