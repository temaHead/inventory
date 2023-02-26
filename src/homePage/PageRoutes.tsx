import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import RoomInventory from '../roomInventory/RoomInventory';

function PageRoutes() {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/main' element={<RoomInventory type={'main'} add={false}/>} />
        <Route path='/main-left' element={<RoomInventory type={'main-left'} add={false}/>} />
        <Route path='/main-right' element={<RoomInventory type={'main-right'} add={false}/>} />
        <Route path='/production' element={<RoomInventory type={'production'} add={false}/>} />
        <Route path='/main-101' element={<RoomInventory type={'main-101'} add={true}/>} />
        <Route path='/main-102' element={<RoomInventory type={'main-102'} add={true}/>} />
        <Route path='/main-head' element={<RoomInventory type={'main-head'} add={true}/>} />
        <Route path='/production-1' element={<RoomInventory type={'production-1'} add={true}/>} />
        <Route path='/production-2' element={<RoomInventory type={'production-2'} add={true}/>} />



      </Route>
    </Routes>
  );
}

export default PageRoutes;
