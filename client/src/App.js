import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home/home";
import LandingPage from "./views/landingPage/landingPage";
import LoadingScreen from "./components/LoadingScreen/loadingScreen";
import CreateRecipe from "./views/create/form";
import Detail from "./components/Detail/detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
