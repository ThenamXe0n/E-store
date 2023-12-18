import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./orderSlice";
import { selectLoggedInUserInfo } from "../user/userSlice";
import { fetchOrderByUserId } from "./orderAPI";

export function Order() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserInfo);
  
  useEffect(()=>{
    const userId = user.id
    dispatch(fetchOrderByUserId(userId))
  },[dispatch, user.id])

  return (
    <div>
      <div>
      
      </div>
    </div>
  );
}
