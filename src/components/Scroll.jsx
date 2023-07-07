import { useState } from "react";

function Scroll() {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return console.log(handleScroll);
}

export default Scroll;
