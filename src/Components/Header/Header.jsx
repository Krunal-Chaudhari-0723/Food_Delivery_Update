import React from "react";
import { Box, Typography, Button } from "@mui/material";

import bg1 from "./BG6.jpg";

const Header = () => {
  return (
    <Box
      sx={{
        height: "70vh",
        borderRadius: "15px",
        overflow: "hidden",
        position: "relative",
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card */}
      <Box
        sx={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          maxWidth: "420px",
          p: 4,
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.4)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          sx={{
            mb: 2,
            fontSize: { xs: "24px", md: "34px" },
          }}
        >
          Bhook Lagi Hai? <br />
          Order Karo!
        </Typography>

        <Typography
          sx={{
            mb: 3,
            color: "#f1f1f1",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Fresh and delicious food delivered straight to your doorstep.
          Explore our menu and enjoy your favorite dishes anytime.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ff5722",
            padding: "10px 28px",
            borderRadius: "30px",
            fontWeight: "600",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#e64a19",
              transform: "scale(1.05)",
            },
          }}
        >
          Explore Menu
        </Button>
      </Box>
    </Box>
  );
};

export default Header;