import { RootState } from './store';
import Inventory from './types/Inventory';
import Place from './types/Place';

export const selectPlaces = (state: RootState): Place[] => state.app.places;

export const selectInventory = (state: RootState): Inventory[] => state.app.inventory;
