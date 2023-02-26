import { Outlet } from 'react-router';
import style from './App.module.css';
import NavBar from './navBar/NavBar';

function App() {
  return (
    <div className={style.container}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
