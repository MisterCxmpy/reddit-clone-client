import { useState, useEffect } from 'react';

const useUpperCase = (inputString) => {
  const [resultString, setResultString] = useState('');

  useEffect(() => {
    if (inputString && typeof inputString === 'string' && inputString.length > 0) {
      const firstChar = inputString.charAt(0).toUpperCase();
      const restOfString = inputString.slice(1);
      setResultString(firstChar + restOfString);
    } else {
      setResultString('');
    }
  }, [inputString]);

  return resultString;
};

export default useUpperCase;
