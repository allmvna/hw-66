import {Alert, Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {NavLink} from "react-router-dom";
import axiosAPI from "../../axiosAPI.ts";
import {useCallback, useEffect, useState} from "react";
import {ITracker, ITrackerAPI} from "../../types";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MealList = () => {
    const [meals, setMeals] = useState<ITracker[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const response: { data: ITrackerAPI } =
                await axiosAPI<ITrackerAPI>("meal.json");

            if (response.data) {
                const mealFromAPI = Object.keys(response.data).map((mealId) => {
                    return {
                        ...response.data[mealId],
                        id: mealId,
                    };
                });
                setMeals(mealFromAPI);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const deleteMeal = async (id: string) => {
        try {
            await axiosAPI.delete(`/meal/${id}.json`);
            setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    return (
        <>
            <Typography
                variant="h4"
                sx={{ mb: 2, textAlign: "center", color: "#000" }}
            >
                Posts
            </Typography>
            {meals.length === 0 ? (
                <Alert severity="info">
                    There are no posts yet! Go to the "Add" page to add a new post
                </Alert>
            ) : (
                <Grid container spacing={2}>
                    {meals.map((meal) => (
                        <Grid size={12} key={meal.id}>
                            <Card
                                sx={{
                                    minWidth: 275,
                                    backgroundColor: "inherit",
                                    border: "3px solid",
                                    borderRadius: "10px",
                                    p: 1,
                                    display: 'flex',
                                }}
                            >
                                <CardContent
                                    sx={{ flexGrow: 1}}
                                >
                                    <Typography
                                        gutterBottom
                                        sx={{ fontSize: 18, color: 'secondary' }}
                                    >
                                        {meal.nameCategory}
                                    </Typography>
                                    <hr />
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                            {meal.description}
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, marginLeft: 2 }}>
                                            {meal.calories} kcal
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "flex-end", display: 'flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Button
                                            component={NavLink}
                                            to={`/edit/${meal.id}`}
                                            variant="contained"
                                            size="medium"
                                        >
                                            {<ModeEditOutlineIcon />}
                                        </Button>
                                        <Button
                                            onClick={() => deleteMeal(meal.id)}
                                            variant="contained"
                                            size="medium"
                                            color = 'error'
                                        >
                                            {<DeleteOutlineIcon />}
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>

                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default MealList;