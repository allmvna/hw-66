import {Route, Routes} from "react-router-dom";
import NewMeal from "../NewMeal/NewMeal.tsx";
import MealList from "../MealList/MealList.tsx";
import Layout from "../../UI/Layout/Layout.tsx";

const Tracker = () => {
    return (
        <>
          <Layout>
              <Routes>
                  <Route path="/" element={<MealList />} />
                  <Route path="/home" element={<MealList />} />
                  <Route path="/new_meal" element={<NewMeal />} />
                  <Route path="/new_meal/:idMeal" element={<NewMeal />} />
              </Routes>
          </Layout>
        </>
    );
};

export default Tracker;