import React, {useState, useEffect} from 'react'

const useMobile = () => {
    const condition = window.innerWidth <= 768;
    const [isMobile, setIsMobile] = useState(condition); 
    function handleWindowSizeChange() {
        setIsMobile(condition);
    }
    useEffect(()=>{
        window.addEventListener('resize', handleWindowSizeChange);
    },[])

  return {
    isMobile
  }
}

export default useMobile