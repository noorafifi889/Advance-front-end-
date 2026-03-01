import React from 'react'
import { RootState } from '../shared/state/store';
 import {useDispatch, useSelector} from 'react-redux';
const Counter = () => {
    const count =useSelector((state:RootState) => state.counter.value);
const dispatch = useDispatch();
    return (
    <div><h2>Count: {count}</h2>
    <button onClick={() => dispatch({type: 'counter/increment'})}>Increment</button>

    <button className="decrement-button" onClick={() => dispatch({type: 'counter/decrement'})}>Decrement</button>
    </div>
  )
}

export default Counter
