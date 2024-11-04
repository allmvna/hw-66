import {Button, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField, Typography,} from "@mui/material";
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
  date: "",
};

const TrackerForm = () => {
  const [form, setForm] = useState<ITrackerForm>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const params = useParams<{ idMeal: string }>();
  const navigate = useNavigate();

  const fetchMeal = useCallback(async (id: string) => {
    if (!id) return;
    setLoading(true);
    try {
      const response: { data: ITrackerAPI } = await axiosAPI(`meal/${id}.json`);

      if (response.data) {
        setForm({
          nameCategory: response.data.nameCategory || "",
          description: response.data.description || "",
          calories: response.data.calories || 0,
          date: response.data.date
        });
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.idMeal) {
      void fetchMeal(params.idMeal);
    } else {
      setLoading(false);
    }
  }, [params.idMeal, fetchMeal]);

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
      if (params.idMeal) {
        await axiosAPI.patch(`meal/${params.idMeal}.json`, form);
      } else {
        await axiosAPI.post("meal.json", form);
        setForm(initialState);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
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
              name="nameCategory"
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
                    type="date"
                    name="date"
                    value={form.date}
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
              id="description"
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
              id="calories"
              label="Enter calories"
              variant="outlined"
              name="calories"
              type="number"
              inputProps={{ min: 1 }}
              value={form.calories || ""}
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
                backgroundImage: "linear-gradient(90deg, #052f46, #0a4666)",
                "&:hover": {
                  backgroundImage: "linear-gradient(90deg, #0a4666, #052f46)",
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : params.idMeal ? (
                "Save"
              ) : (
                "Add"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TrackerForm;
