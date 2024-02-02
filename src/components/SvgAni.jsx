import React, { useRef, useEffect } from "react";
import svgImage from "./react-2.svg";

const SvgAni = () => {
  const svgRef = useRef(null);
  let animationFrameId = null;

  useEffect(() => {
    const svg = svgRef.current;

    const animation = () => {
      const rotation = svg.getAttribute('transform') ? parseFloat(svg.getAttribute('transform').split('(')[1]) : 0;
      svg.setAttribute('transform', `rotate(${rotation + 1})`);
      animationFrameId = requestAnimationFrame(animation); 
    };

    animation();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <svg ref={svgRef} width="80" height="80">
      <image xlinkHref={svgImage} width="100%" height="100%" transform="rotate(0)" />
    </svg>
  );
};

export default SvgAni;