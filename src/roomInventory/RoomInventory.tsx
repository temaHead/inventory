import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inventoryChange, inventoryDeleted, inventoryLoaded, placesLoaded, productCreated } from '../appSlice';
import Inventory from '../inventory/Inventory';
import { selectInventory, selectPlaces } from '../selectors';
import { useAppDispatch } from '../store';

import style from './RoomInventory.module.css';

type RoomInventoryProps = {
  type: string;
  add: boolean;
};

function RoomInventory(props: RoomInventoryProps): JSX.Element {
  const { type, add } = props;

  const [newProductName, setNewProductName] = useState('');
  const [countProduct, setCountProduct] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  let roomInventory;
  
  
  useEffect(() => {
    dispatch(inventoryLoaded());
  }, []);
  
  useEffect(() => {
    dispatch(placesLoaded());
  }, [dispatch]);
  
  const inventory = useSelector(selectInventory);
  
  if (type === 'main') {
    const arr = ['main-101', 'main-102', 'main-head'];
    roomInventory = inventory.filter((el) => {
      return el['placeId'] === arr[1] || el['placeId'] === arr[0] || el['placeId'] === arr[2];
    });
  } else if (type === 'production') {
    const arr = ['production-1', 'production-2'];
    roomInventory = inventory.filter((el) => el['placeId'] === arr[0] || el['placeId'] === arr[1]);
  } else if (type === 'main-left') {
    const arr = ['main-101', 'main-102'];
    roomInventory = inventory.filter((el) => el['placeId'] === arr[0] || el['placeId'] === arr[1]);
  } else if (type === 'main-right') {
    const arr = ['main-head'];
    roomInventory = inventory.filter((el) => el['placeId'] === arr[0]);
  } else {
    roomInventory = inventory.filter((el) => el['placeId'] === type);
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewProductName(event.target.value);
  };

  const handleCountProduct = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCountProduct(event.target.value);
  };

  const handleShow = (event: React.MouseEvent): void => {
    setShow(!show);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const newProduct = {
      name: newProductName,
      count: countProduct,
      place: type,
    };
    dispatch(productCreated(newProduct));
    setShow(!show);
  };

  const handleDelete = (id: string): void => {
    dispatch(inventoryDeleted(id));
  };

  const handleProductChange=(newProduct:{}):void=>{
    dispatch(inventoryChange(newProduct))
  }

  return (
    <div className={style.containerRoom}>
      <div className={style.title}>Список доступного инвертаря</div>

      {add && (
        <button className={style.buttonAdd} onClick={handleShow}>
          Добавить инвентарь
        </button>
      )}
      {show && (
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputBox}>
            <input type='text' placeholder='Название' name='nameInventory' value={newProductName} onChange={handleChangeName} />
            <input type='text' placeholder='Колличество' name='countInventory' value={countProduct} onChange={handleCountProduct} />
          </div>
          <div className={style.buttonBox}>
            <button type='submit'>Сохранить</button>
            <button onClick={handleShow}>Отменить</button>
          </div>
        </form>
      )}
      <div className={style.containerItem}>
        {roomInventory.map((el) => (
          <Inventory key={el.id} el={el} onDelete={handleDelete} onChange={handleProductChange}/>
        ))}
      </div>
    </div>
  );
}

export default RoomInventory;
