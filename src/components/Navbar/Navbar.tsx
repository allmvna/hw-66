import { AppBar, Box, Button, Container, Toolbar, Typography,} from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 5 }}>
                <AppBar
                    position="static"
                    sx={{
                        padding: "10px",
                        borderBottom: "1px solid",
                        backgroundImage: 'linear-gradient(90deg, #0a4666, #052f46)',
                        '&:hover': {
                            backgroundImage: 'linear-gradient(90deg, #1e3a47, #2b4f5d, #3c6575)',
                        }
                    }}
                >
                    <Toolbar>
                        <Container
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                to="/"
                                variant="h5"
                                component={NavLink}
                                sx={{ flexGrow: 1, textDecoration: "none", color: "#ffff" }}
                            >
                                Calorie tracker
                            </Typography>
                            <Box>
                                <Button
                                    to="/add_new_meal"
                                    variant="contained"
                                    sx={{
                                        backgroundImage: 'linear-gradient(90deg, #052f46, #0a4666)',
                                        borderColor: 'white',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(90deg, #0a4666, #052f46)'
                                        }
                                    }}

                                    component={NavLink}
                                >
                                    Add new meal
                                </Button>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Navbar;
