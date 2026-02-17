import { UserContext } from "../context/usercontext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

export default function Private(props) {
    const { loggedUser } = useContext(UserContext);
    const Component = props.component;

    return (
        loggedUser !== null
            ? <Component />
            : <Navigate to="/login" />
    );
}
