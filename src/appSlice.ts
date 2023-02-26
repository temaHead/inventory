import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';

import PlacesState from './types/PlacesState';

const initialState: PlacesState = {
  places: [],
  inventory: [],
};

export const placesLoaded = createAsyncThunk('placesLoaded', async () => {
  const places = await api.getPlaces();
  return 'places';
});

export const inventoryLoaded = createAsyncThunk('inventoryLoaded', async () => {
  const inventory = await api.getInventory();
  return inventory;
});

export const productCreated = createAsyncThunk('productCreated', async (newProduct: any) => {
  const product = await api.addProduct(newProduct);
  console.log(product);

  return product;
});

export const inventoryDeleted = createAsyncThunk('inventoryDeleted', async (inventoryId: string) => {
  const deleted = await api.deletedInventory(inventoryId);
  console.log(deleted);

  return inventoryId;
});

export const inventoryChange = createAsyncThunk('inventoryChange', async (newProduct: any) => {
  const changeInventory = await api.changeInventory(newProduct);
  return changeInventory;
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placesLoaded.fulfilled, (state, action) => {
        const places = action.payload;
        state.places = places;
      })
      .addCase(inventoryLoaded.fulfilled, (state, action) => {
        const inv = action.payload;
        state.inventory = inv;
      })
      .addCase(productCreated.fulfilled, (state, action) => {
        const product = action.payload;
        state.inventory.push(product);
      })
      .addCase(inventoryDeleted.fulfilled, (state, action) => {
        const idInventory = action.payload;
        console.log(idInventory, 'slice');
        state.inventory.filter((el) => el.id !== idInventory);
      })
      .addCase(inventoryChange.fulfilled, (state, action) => {
        const changeData = action.payload;
        state.inventory.map((inv) => (inv.id === changeData.id ? changeData : inv));
      });
  },
});

export default appSlice.reducer;
