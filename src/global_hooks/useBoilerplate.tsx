import { useEffect, useState } from "react";

// How to make custom async hook.

function useBoilerplate() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState({
    // The state `data` should contain all of your async data...
  });

  // Functions called by user
  const handleA = async () => {};
  const handleB = async () => {};

  const fetchData = async () => {
    try {
      // Write all await functions in here...
      setData({});
    } catch (e) {
      setHasError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 컴포넌트 첫 마운트 될 시에만 모든 비동기 데이터 호출.
    fetchData();
  }, []);
  return {
    data,
    loading,
    hasError,
    handleA,
    handleB,
  }; // Return all values and methods, then, you can use these in your view component.
  // You can return setData, setLoading, setHasError as well.
}

export default useBoilerplate;
