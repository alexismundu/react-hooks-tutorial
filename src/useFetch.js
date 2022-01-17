import { useEffect, useState, useRef } from "react";

export const useFetch = url => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    return () => {
      // called when the component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url)
      .then(res => res.text())
      .then(data => {
        setTimeout(() =>{
          if (isCurrent.current) {
            setState({ data, loading: false });
          }
        },2000)
      });
  }, [url, setState]);

  return state;
};
