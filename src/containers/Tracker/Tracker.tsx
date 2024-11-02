import Navbar from "../../components/Navbar/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import AddNewMeal from "../AddNewMeal/AddNewMeal.tsx";

const Tracker = () => {
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <Routes>
                <Route path="/add_new_meal" element={<AddNewMeal />} />
            </Routes>
        </>
    );
};

export default Tracker;