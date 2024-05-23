import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";

import AuthContext from "../contexts/AuthContext";

function PrivateRoute({ children, ...rest }) {
    const auth = useContext(AuthContext);

    return (
        <Route
        {...rest} //exact path='/places'>
        render={({location}) => 
            auth.token ? (
                children //Если есть токен то показываем то что в children
            ) : (
                <Redirect //Если нема то редирект на логин из location
                to={{
                    pathname: "/login",
                    state: { from: location },
                }}
                />
            )
        }
        />
    )
}

export default PrivateRoute;