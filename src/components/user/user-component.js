import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import userActions from "../../entities/user/user-actions";

import style from "./user.module.css";

import userSagas from "../../entities/user/user-saga";

//https://rasha08.medium.com/combining-redux-sagas-for-more-scalable-stores-68d8a2629cc

const UserComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // debugger;
  }, [count]);
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

  const callGetUsers = function* () {
    let count = 0;

    // debugger;
    yield userSagas.callGetUsers({ x: 1 });
  };

  const getUsersTakeFork = () => {
    let count = 0;
    userActions.getUsersRequestTakeFork(dispatch, count);

    // let count = 0;
    // setInterval((el) => {
    //   while (count < 7) {
    //     count++;
    //     userActions.getUsersRequestTakeFork(dispatch, count);
    //   }
    // }, 700);

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

  const channelCountDown = () => {
    userActions.channelCountDown(dispatch);
  };


  const watchChannelRequests = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.watchChannelRequests(dispatch, count);
      }
    }, 700);
  };

  const watchChannelRequestsFork = () => {
    let count = 0;
    setInterval((el) => {
      while (count < 7) {
        count++;
        userActions.watchChannelRequestsFork(dispatch, count);
      }
    }, 700);
  };

  return (
    <>
      <span>USERS</span>

      <div>
        <button className={style.increment} onClick={() => callGetUsers()}>
          callGetUsers
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={getUsersTake}>
          getUsersRequestTake
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={getUsersTakeFork}>
          getUsersRequestTakeFork
        </button>
      </div>

      <div>
        <button
          className={style.increment}
          onClick={getUsersRequestTakeUnblock}
        >
          getUsersRequestTakeUnblock
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={watchChannelRequests}>
          watchChannelRequests
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={watchChannelRequestsFork}>
          watchChannelRequestsFork
        </button>
      </div>

      <div>------</div>

      <div>
        <button className={style.increment} onClick={getUsersTakeLast}>
          getUsersRequestLatest
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={getUsersTakeEvery}>
          getUsersRequestTakeEvery
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={getUsersTakeLeading}>
          getUsersTakeLeading
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={getUsersTakeMaybe}>
          getUsersTakeMaybe
        </button>
      </div>

      <div>
        <button className={style.increment} onClick={channelCountDown}>
          channel countdown
        </button>
      </div>


      <div className={style.container}>
        {console.log("render users", users)}
        {users &&
          users.map((el) => {
            return (
              <div>
                <div>{el.name} </div>
                <div>{el.reqid} </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default UserComponent;
