interface BoxItemProps {
  flexValue: number;
}

const BoxItem: React.FC<BoxItemProps> = ({ flexValue }) => {
  return <div className="box-item" style={{ height: `${flexValue}%` }}></div>;
};

export default BoxItem;
