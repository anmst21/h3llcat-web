import {
  CollectionChain,
  CollectionContract,
  CollectionStandard,
  CollectionId,
} from "../icon";
import classNames from "classnames";
import { MetaItemName } from "./types";

interface MetaItemProps {
  name: MetaItemName;
  value: string | number;
  isBg: boolean;
}

const MetaItem: React.FC<MetaItemProps> = ({ name, value, isBg }) => {
  let itemData: { name: string; icon: JSX.Element };

  switch (name) {
    case MetaItemName.contract:
      itemData = {
        name: "Contract",
        icon: <CollectionContract />,
      };
      break;
    case MetaItemName.token:
      itemData = {
        name: "Token ID",
        icon: <CollectionId />,
      };
      break;
    case MetaItemName.chain:
      itemData = {
        name: "Chain",
        icon: <CollectionChain />,
      };
      break;

    case MetaItemName.standard:
      itemData = {
        name: "Standard",
        icon: <CollectionStandard />,
      };
      break;
  }

  return (
    <div className={classNames("meta-item", { "meta-item--bg": isBg })}>
      <div className="meta-item__info">
        {itemData.icon}
        <span>{itemData.name}</span>
      </div>
      <span className="meta-item__value">{value}</span>
    </div>
  );
};

export default MetaItem;
