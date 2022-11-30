import React, { useState } from 'react';
import style from './counter.module.css';
import { connect } from 'react-redux';
import ACTIONS from '../../store/actions/constants';

const Counter = ({
  count,
  onIncrementAsync,
  onIncrement,
  onDecrement,
}) => {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className={style.container}>
        <button className={style.increment} onClick={onIncrement}>
          +
        </button>
        <button className={style.decrement} onClick={onDecrement}>
          -
        </button>
        <button className={style.decrement} onClick={onIncrementAsync}>
          async
        </button>
      </div>
      <div className={style.displayValue}>{count}</div>
    </>
  );
};
const action = (type) => () => ({ type });

const mapState = (state) => {
  return {count: state.counter}
}

export const ConnectedCounter = connect(mapState, {
  onIncrement: action(ACTIONS.INCREMENT),
  onDecrement: action(ACTIONS.DECREMENT),
  onIncrementAsync: action(ACTIONS.INCREMENT_ASYNC),
})(Counter);
