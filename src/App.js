import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/header/Header';
import UI from './Components/ui/UI';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Header />} />
    //     <Route path='/' element={<UI />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <Header />
      <UI />
    </div>
  );
}

export default App;
