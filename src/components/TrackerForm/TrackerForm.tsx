import {Button, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {useCallback, useEffect, useState} from "react";
import axiosAPI from "../../axiosAPI.ts";
import {ITrackerAPI, ITrackerForm} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import Preloader from "../../UI/Preloader/Preloader.tsx";

const initialState = {
    nameCategory: "",
    description: "",
    calories: 0,
};

const TrackerForm = () => {
    const [form, setForm] = useState<ITrackerForm>(initialState);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [meal, setMeal] = useState<ITrackerAPI>({});
   const params = useParams<{ idMeal: string }>();
    const navigate = useNavigate();

   const fetchOneMeal = useCallback(async (id: string) => {
       setLoading(true);
       try {
           const response: {data: ITrackerAPI} = await axiosAPI(`meal/${id}.json`);

           if(response.data) {
               setMeal(response.data);
               setForm({
                   nameCategory: response.data.nameCategory || "",
                   description: response.data.description || "",
                   calories: response.data.calories || 0,
               });
           }
       } catch (e) {
           console.log(e);
       } finally {
           setLoading(false);
       }
   }, []);


    useEffect(() => {
        if(params.idMeal){
            void fetchOneMeal(params.idMeal);
        }
    }, [params.idMeal, fetchOneMeal]);


    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response: { data: ITrackerAPI }  = await axiosAPI.get("meal.json");
            return Object.keys(response.data);
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: name === "calories" ? parseFloat(value) : value,
        }));
    };

    const onSelectChange = (e: SelectChangeEvent) => {
        setForm((prevState) => ({
            ...prevState,
            nameCategory: e.target.value,
        }));
    };

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if(params.idMeal){
                await axiosAPI.patch(`meal/${params.idMeal}.json`, form);
            } else {
                await axiosAPI.post("meal.json", form);
                navigate('/');
            }
            setForm(initialState);
            await fetchData();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <Preloader />;
    }
    return (
        <>
            <Typography
                sx={{ mb: 2, textAlign: "center", color: "#000" }}
                variant="h4"
            >
                {params.idMeal ? "Edit meal" : "Add new meal"}
            </Typography>
                <form onSubmit={onSubmitForm}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mx: "auto",
                            width: "60%",
                            border: "3px solid #000",
                            borderRadius: "10px",
                            p: 4,
                        }}
                    >
                        <Grid size={12}>
                            <Select
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                                labelId="category-select-label"
                                id="category-select"
                                value={form.nameCategory}
                                onChange={onSelectChange}
                                displayEmpty
                                required
                            >
                                <MenuItem value="" disabled>
                                    Select category
                                </MenuItem>
                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                                <MenuItem value="Snack">Snack</MenuItem>
                                <MenuItem value="Lunch">Lunch</MenuItem>
                                <MenuItem value="Dinner">Dinner</MenuItem>
                            </Select>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                                id="outlined-basic"
                                label="Enter description"
                                variant="outlined"
                                name="description"
                                value={form.description}
                                onChange={onChangeField}
                                required
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                                id="outlined-basic"
                                label="Enter calories"
                                variant="outlined"
                                name="calories"
                                type="number"
                                inputProps={{ min: 1 }}
                                value={form.calories}
                                onChange={onChangeField}
                                required
                            />
                        </Grid>
                        <Grid size={12} sx={{ textAlign: "center" }}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                backgroundImage: 'linear-gradient(90deg, #052f46, #0a4666)',
                                    '&:hover': {
                                        backgroundImage: 'linear-gradient(90deg, #0a4666, #052f46)'
                                    }}}>
                                {isSubmitting ? (
                                    <CircularProgress size={20} sx={{color: 'white'}}/>
                                ) : (
                                    params.idMeal ? "Save" : "Add"
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </>
    );
};

export default TrackerForm;