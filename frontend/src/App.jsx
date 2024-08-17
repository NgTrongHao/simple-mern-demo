import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import User from "./user/pages/User";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<User />} />
          </Routes>
          <Navigate to="/" />
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
