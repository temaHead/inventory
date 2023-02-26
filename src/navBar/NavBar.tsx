import React from 'react';

import { Link } from 'react-router-dom';

import style from './NavBar.module.css';

function NavBar() {
  return (
    <div className={style.navContainer}>
      <div className={style.mainRoom}>
        <Link to='main' title='Инвентарь из левого и правого крыла'> Главный офис</Link>

        <div className={style.leftRoom}>
          <Link to='main-left' title='Инвентарь кабинета 101 и 102'> Левое крыло</Link>
          <div className={style.room}>
            <Link to='main-101' title='Инвентарь кабинета 101'>► Кабинет 101 </Link>
          </div>
          <div className={style.room}>
            <Link to='main-102' title='Инвентарь кабинета 102'>► Кабинет 102 </Link>
          </div>
        </div>
        <div className={style.rightRoom}>
          <Link to='main-right'> Правое крыло</Link>
          <div className={style.room}>
            <Link to='main-head'> ► Кабинет руководителя</Link>
          </div>
        </div>
      </div>
      <div className={style.mainRoom}>
        <Link to='production'> Производственный комплекс</Link>

        <div className={style.leftRoom}>
          <Link to='production-1'> Цех предварительной обработки сырьевого материала</Link>
        </div>
        <div className={style.rightRoom}>
          <Link to='production-2'>Производственный цех</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

