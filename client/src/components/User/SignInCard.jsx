import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon } from "./CustomeIcons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "500px",
  backgroundColor: "#002855",
  color: "#FFFFFF",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const OnSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // Get values from the form
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validate inputs
      if (!validateInputs()) return;

      // Make the request
      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedin(true); // Update login state
        await getUserData(); // Fetch user data
        toast.success("Login successful");
        navigate("/"); // Redirect to home after successful login
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error.response ? error.response.data : error.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>

      <form onSubmit={OnSubmitHandler}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: "#AAB4BE" }}>
              Email
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              color="primary"
              sx={{
                backgroundColor: "#0F151D",
                color: "#FFFFFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2C3748" },
                  "&:hover fieldset": { borderColor: "#AAB4BE" },
                },
                "& .MuiInputBase-input": { color: "#FFFFFF" },
              }}
            />
          </FormControl>

          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password" sx={{ color: "#AAB4BE" }}>
                Password
              </FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ color: "#AAB4BE" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color="primary"
              sx={{
                backgroundColor: "#0F151D",
                color: "#FFFFFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#2C3748" },
                  "&:hover fieldset": { borderColor: "#AAB4BE" },
                },
                "& .MuiInputBase-input": { color: "#FFFFFF" },
              }}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" sx={{ color: "#AAB4BE" }} />}
            label="Remember me"
            sx={{ color: "#AAB4BE" }}
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#E5E8EB",
              color: "#181F28",
              "&:hover": { backgroundColor: "#D1D5D9" },
            }}
          >
            Sign in
          </Button>
        </Box>
      </form>

      <Typography sx={{ textAlign: "center", color: "#AAB4BE" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" variant="body2" sx={{ color: "#FFFFFF" }}>
          Sign up
        </Link>
      </Typography>

      <Divider sx={{ backgroundColor: "#2C3748" }}>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            borderColor: "#2C3748",
            color: "#FFFFFF",
            "&:hover": { borderColor: "#AAB4BE", backgroundColor: "#0F151D" },
          }}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          sx={{
            borderColor: "#2C3748",
            color: "#FFFFFF",
            "&:hover": { borderColor: "#AAB4BE", backgroundColor: "#0F151D" },
          }}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
}