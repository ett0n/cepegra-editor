const ScanOverlay = () => {
  /* ------------- R E N D U ------------- */
  return (
    <svg viewBox="0 0 100 100" className="scanOverlay">
      <path
        fill="none"
        d="M13,0 L0,0 L0,13"
        stroke="rgba(255, 0, 0, 0.9)"
        stroke-width="5"
      ></path>
      <path
        fill="none"
        d="M0,87 L0,100 L13,100"
        stroke="rgba(255, 0, 0, 0.9)"
        stroke-width="5"
      ></path>
      <path
        fill="none"
        d="M87,100 L100,100 L100,87"
        stroke="rgba(255, 0, 0, 0.9)"
        stroke-width="5"
      ></path>
      <path
        fill="none"
        d="M100,13 L100,0 L87,0"
        stroke="rgba(255, 0, 0, 0.9)"
        stroke-width="5"
      ></path>
    </svg>
  );
};

export default ScanOverlay;