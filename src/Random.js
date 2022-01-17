import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

export const Random = () => {
  // TODO(1): When reading from local storage, which could be a better way to initiate the count state?
  const initialCount = JSON.parse(localStorage.getItem('count'));
  const [count, setCount] = useState(initialCount);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO(3): Extract the fething logic into a custom hook.
  /* TODO(5): Fix "Can't perform a React state update on an unmounted component" error.
  Click the increment button and immediately right after click the toggle button,
  notice that after the 2 second delay there will be an error in the console.
  
  HINT: useRef
  */
  // TODO(6): Refactor the fetching logic to handle state with useReducer.
  useEffect(() => {
    setData(null);
    setLoading(true);
    fetch(`http://numbersapi.com/${count}/trivia`)
      .then((res) => res.text())
      .then((data) => {
        setTimeout(() => {
          setData(data);
          setLoading(false);
        }, 2000);
      });
    // TODO(2): Add error handling.
    // TODO(4): Use the useDebugValue hook to display the data when available, otherwise the error.
  }, [count]);

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  const [rect, setRect] = useState({});
  const divRef = useRef();

  useLayoutEffect(() => {
    setRect(divRef.current.getBoundingClientRect());
    // We could do something after the data changed
  }, [data]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {error ? (
          <div>Oops something happened :'(</div>
        ) : (
          <div ref={divRef}>{loading ? 'loading...' : data}</div>
        )}
      </div>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
      <div>count: {count}</div>
      <button onClick={() => setCount((c) => c + 1)}>increment</button>
    </div>
  );
};
