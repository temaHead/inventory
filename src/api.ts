import { db } from './firebase';
import Inventory from './types/Inventory';

export async function getPlaces(): Promise<any> {
  const response = await db.collection('places').get();
  let docs = response.docs.map((x) => ({
    id: x.id,
    data: x.data(),
    parts: x.data().parts && x.data().parts.map((part: any) => part.id),
  }));
  return docs;
}

export async function getInventory(): Promise<any> {
  const response = await db.collection('inventory').get();

  let inv = response.docs.map((x) => ({
    id: x.id,
    data: x.data(),
    placeId: x.data().place,
  }));

  const newInv = inv.filter(
    (el) =>
      el.placeId === 'main-101' ||
      el.placeId === 'main-102' ||
      el.placeId === 'production-1' ||
      el.placeId === 'production-2' ||
      el.placeId === 'main-head'
  );

  return newInv;
}

export async function addProduct(newProduct: { place: string; name: string; count: number }): Promise<any> {
  const { place, name, count } = newProduct;
  const response = await db.collection('inventory').add({
    name: name,
    count: count,
    place: place,
  });
  return { id: response.id, data: { count: count, name: name, place: place }, placeId: place };
}

export async function deletedInventory(id: string): Promise<boolean> {
  const response = await db.collection('inventory').doc(id).delete();
  return true;
}

export async function changeInventory(newProduct: { name: string; count: string; el: Inventory }): Promise<any> {
  const id: string = newProduct.el.id;
  const { name, count, el } = newProduct;
  const response = await db.collection('inventory').doc(id).update({
    name,
    count,
    place: el.placeId,
  });
  return { id, data: { count: count, name, place: el.placeId }, placeId: el.placeId };
}
