import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    // Check if redux-persist has finished rehydrating
    const { _persist } = useSelector(store => store);

    useEffect(() => {
        // Only redirect AFTER rehydration is complete
        if (_persist?.rehydrated && (user === null || user.role !== 'recruiter')) {
            navigate("/");
        }
    }, [user, _persist?.rehydrated]);

    // Show nothing while rehydrating
    if (!_persist?.rehydrated) return null;

    return <>{children}</>;
};

export default ProtectedRoute;