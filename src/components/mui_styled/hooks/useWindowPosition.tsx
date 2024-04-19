import { useLayoutEffect, useState } from "react";

export default function useWindowPosition(id : string) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    function  updatePostion() {
      const offsetHeight = window.document.getElementById(id)?.offsetHeight;
      console.log("windowPageOffset 출력", window.scrollY, offsetHeight);
      if (offsetHeight !== undefined && window.scrollY > offsetHeight * 0.7) {
        setAnimation(true);
      }
    }
    window.addEventListener("scroll", updatePostion);
    updatePostion(); // 이거 왜 적지?
    return () => window.removeEventListener('scroll', updatePostion);


  }, [id]);
  return animation;
}
