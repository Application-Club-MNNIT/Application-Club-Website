import React from "react";
import {useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error: any = useRouteError();
    console.log(error);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();


    return (
        <>
            <div>This is error page</div>
            <div>{error.response?.data?.message || error.message}</div>
        </>
    );
};

export default ErrorPage;
