interface SticksProps {
  totalSticks: number;
  filledSticks: number;
  stickWidth: number;
  stickHeight: number;
  gap: number;
}

const Sticks: React.FC<SticksProps> = ({
  totalSticks,
  filledSticks,
  stickWidth,
  stickHeight,
  gap,
}) => {
  return (
    <svg
      width={(stickWidth + gap) * totalSticks - gap}
      height={stickHeight}
      style={{ display: "block" }}
    >
      {[...Array(totalSticks)].map((_, i) => (
        <rect
          key={i}
          x={i * (stickWidth + gap)}
          y={0}
          width={stickWidth}
          height={stickHeight}
          rx={1} // Rounded corners
          fill={i < filledSticks ? "#FC0" : "#93918E"}
        />
      ))}
    </svg>
  );
};

export default Sticks;
