import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Paper,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  ArrowForwardRounded,
  Google,
  Apple,
} from "@mui/icons-material";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [currentState, setcurrentState] = useState("Login");

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    name:
      currentState !== "Login"
        ? Yup.string()
            .min(3, "Name must be at least 3 characters")
            .required("Full Name is required")
        : Yup.string(),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let newUrl =
        url +
        (currentState === "Login"
          ? "/api/user/login"
          : "/api/user/register");

      try {
        const response = await axios.post(newUrl, values);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          alert(response.data.message);
        }
      } catch (e) {
        alert("Connection Error");
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* LEFT PANEL WITH IMAGE */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          background:
            "linear-gradient(135deg, #ff6b35, #ff9f43)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          p: 6,
          overflow: "hidden",
        }}
      >
        {/* Background Food Image */}
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="food"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />

        <Box position="relative" zIndex={1} maxWidth={400}>
          <Typography variant="h3" fontWeight={800} mb={2}>
            FoodDel
          </Typography>
          <Typography variant="body1">
            Order your favorite meals from the best restaurants near you.
            Fast delivery. Fresh taste. Zero hassle.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT PANEL */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 5,
            borderRadius: 5,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={1}>
            {currentState === "Login"
              ? "Welcome Back 👋"
              : "Create Account"}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={4}>
            {currentState === "Login"
              ? "Login to continue"
              : "Join us and explore amazing meals"}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              {currentState !== "Login" && (
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.name &&
                    Boolean(formik.errors.name)
                  }
                  helperText={
                    formik.touched.name &&
                    formik.errors.name
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <TextField
                fullWidth
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.email &&
                  Boolean(formik.errors.email)
                }
                helperText={
                  formik.touched.email &&
                  formik.errors.email
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="password"
                type="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password &&
                  Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password &&
                  formik.errors.password
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardRounded />}
                sx={{
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #ff6b35, #ff9f43)",
                  boxShadow:
                    "0 12px 30px rgba(255,107,53,0.4)",
                }}
              >
                {currentState === "Login"
                  ? "Sign In"
                  : "Sign Up"}
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 4 }}>OR</Divider>

          <Stack direction="row" spacing={2}>
            <Button fullWidth variant="outlined" startIcon={<Google />}>
              Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<Apple />}>
              Apple
            </Button>
          </Stack>

          <Typography align="center" mt={4} variant="body2">
            {currentState === "Login"
              ? "New to FoodDel?"
              : "Already have an account?"}
            <Box
              component="span"
              onClick={() =>
                setcurrentState(
                  currentState === "Login"
                    ? "Sign Up"
                    : "Login"
                )
              }
              sx={{
                ml: 1,
                fontWeight: 600,
                color: "#ff6b35",
                cursor: "pointer",
              }}
            >
              {currentState === "Login"
                ? "Sign Up"
                : "Login"}
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;