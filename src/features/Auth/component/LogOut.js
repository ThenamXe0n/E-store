import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutuserAsync } from "../AuthSlice";

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutuserAsync());
  }, []);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};

export default LogOut;
