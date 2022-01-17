import { useEffect, useRef, useReducer, useDebugValue } from 'react';

const ACTIONS = {
  START: 'start',
  SUCCESS: 'success',
  ERROR: 'error',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case ACTIONS.SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case ACTIONS.ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const useFetch = (url) => {
  const isCurrent = useRef(true);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    return () => {
      // called when the component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch({ type: ACTIONS.START });
    fetch(url)
      .then((res) => {
        if(!res.ok) {
          throw Error(res.statusText)
        }
        return res.text()
      })
      .then((data) => {
        setTimeout(() => {
          if (isCurrent.current) {
            dispatch({ type: ACTIONS.SUCCESS, payload: { data } });
          }
        }, 2000);
      })
      .catch((error) => {
        dispatch({ type: ACTIONS.ERROR, payload: { error: error.message } });
      });
  }, [url]);

  useDebugValue(state.data ? state.data : state.error);

  return state;
};
