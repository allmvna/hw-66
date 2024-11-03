import Navbar from "../../components/Navbar/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import NewMeal from "../NewMeal/NewMeal.tsx";
import MealList from "../MealList/MealList.tsx";
import {Container} from "@mui/material";

const Tracker = () => {
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <Container maxWidth="lg" sx={{ color: "white" }}>
            <Routes>
                <Route path="/" element={<MealList />} />
                <Route path="/home" element={<MealList />} />
                <Route path="/new_meal" element={<NewMeal />} />
                <Route path="/new_meal/:idMeal" element={<NewMeal />} />
            </Routes>
            </Container>
        </>
    );
};

export default Tracker;