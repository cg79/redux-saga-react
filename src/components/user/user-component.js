import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import userActions from "../../entities/user/user-actions";

import style from "./user.module.css";

//https://rasha08.medium.com/combining-redux-sagas-for-more-scalable-stores-68d8a2629cc

const UserComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    const { userReducer } = state;
    console.log("user selector", userReducer.items);
    return userReducer.items;
  });

  // useEffect(() => {
  //   console.log(userActions);
  //   userActions.getUsersRequestLatest(dispatch);
  // }, []);
  
  const getUsersTake = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.getUsersRequestTake(dispatch, count);
      }
    }, 700);
  };

  const getUsersTakeFork = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.getUsersRequestTakeFork(dispatch, count);
      }
    }, 700);
  };

  

  const getUsersRequestTakeUnblock = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.getUsersRequestTakeUnblock(dispatch, count);
      }
    }, 700);
  };

  

  const getUsersTakeLast = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.getUsersRequestLatest(dispatch, count);
      }
    }, 700);
  };

  const getUsersTakeEvery = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.getUsersRequestTakeEvery(dispatch, count);
      }
    }, 700);
  };

  const getUsersTakeLeading = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.getUsersRequestTakeLeading(dispatch, count);
      }
    }, 700);
  };

  const getUsersTakeMaybe = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.getUsersRequestTakeMaybe(dispatch, count);
      }
    }, 700);
  };

  

  return (
    <>
      <span>USERS</span>
      <button className={style.increment} onClick={getUsersTake}>
        getUsersRequestTake
      </button>

      <button className={style.increment} onClick={getUsersTakeFork}>
        getUsersRequestTakeFork
      </button>

      <button className={style.increment} onClick={getUsersRequestTakeUnblock}>
      getUsersRequestTakeUnblock
      </button>

      <div>------</div>

      <button className={style.increment} onClick={getUsersTakeLast}>
        getUsersRequestLatest
      </button>

      <button className={style.increment} onClick={getUsersTakeEvery}>
        getUsersRequestTakeEvery
      </button>

      <button className={style.increment} onClick={getUsersTakeLeading}>
        getUsersTakeLeading
      </button>

      <button className={style.increment} onClick={getUsersTakeMaybe}>
        getUsersTakeMaybe
      </button>

      <div className={style.container}>
        {console.log("render users", users)}
        {users &&
          users.map((el) => {
            return <div>
              <div>{el.name} </div> 
              <div>{el.reqid} </div>
              </div>;
          })}
      </div>
    </>
  );
};

export default UserComponent;
