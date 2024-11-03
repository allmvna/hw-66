import { Box, CircularProgress } from "@mui/material";

const Preloader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Preloader;
