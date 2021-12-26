import {
    Navigate
} from "react-router-dom";

const IsAuthenticated = ({children}) => {
    const session = localStorage.getItem('supabase.auth.token')
    if (!session) {
        return <Navigate to="/" />;
    }

    return children;
}

export { IsAuthenticated }