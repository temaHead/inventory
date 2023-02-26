import InventoryData from './InventoryData';

type Inventory = {
  id: string;
  data: InventoryData;
  placeId?: string;
};

export default Inventory;
