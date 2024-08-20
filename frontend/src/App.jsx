import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./user/pages/User";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<NewPlace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
