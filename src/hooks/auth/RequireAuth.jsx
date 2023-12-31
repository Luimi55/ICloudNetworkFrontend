import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const {isAuthenticated} = useAuth()

    return(
        isAuthenticated()
            ?<Outlet/>
            :<Navigate to="/login"/>
    )
}

export default RequireAuth