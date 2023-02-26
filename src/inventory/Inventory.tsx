import React, { useState } from 'react';
import InventoryType from '../types/Inventory';
import style from './Inventory.module.css';

type InventoryProps = {
  el: InventoryType;
  onDelete: (id: string) => void;
  onChange: (newProduct: {}) => void;
};

function Inventory(props: InventoryProps): JSX.Element {
  const { el, onDelete, onChange } = props;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(el.data.name);
  const [count, setCount] = useState(el.data.count);

  const handleDelete = (event: React.MouseEvent): void => {
    event.preventDefault();
    onDelete(el.id);
  };

  const handleEditClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    if (edit) {
      const newProduct = {
        name,
        count,
        el
      };
      onChange(newProduct)
    }
    setEdit(!edit);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };
  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCount(event.target.value);
  };

  return (
    <>
      {el.data.name && (
        <div className={style.card}>
          {edit ? (
            <>
              <input type='text' value={name} onChange={handleNameChange} />
              <input type='text' value={count} onChange={handleCountChange} />
            </>
          ) : (
            <>
              <div>{el.data.name}</div>
              <div>{el.data.count} шт</div>
            </>
          )}

          <div className={style.buttonBox}>
            <button onClick={handleEditClick}>{edit ? 'Сохранить' : 'Ред.'}</button>
            <button onClick={handleDelete}>❌</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Inventory;
