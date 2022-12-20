import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

function App() {
  // style for upload button
  const Input = styled("input")({
    display: "none",
  });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // date Picker State
  const [dob, setdob] = useState(null);
  // Select State
  const [st, setst] = useState("");
  const [gender, setGender] = useState();
  const [jobLocation, setJobLocation] = useState([]);
  const [pimage, setPImage] = useState("");
  const [rdoc, setRDoc] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  // Multi Checkbox
  const getjobLocation = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    console.log(`${value} is ${checked}`);
    if (checked) {
      setJobLocation([...jobLocation, value]); // user check the box
    } else {
      setJobLocation(jobLocation.filter((e) => e !== value)); // user uncheck the box
    }
  };
  console.log(jobLocation);

  // for Reset Form
  const resetForm = () => {
    setName("");
    setEmail("");
    setdob(null);
    setst("");
    setGender("");
    setJobLocation([]);
    setPImage("");
    setRDoc("");
    document.getElementById("resume-form").reset();
  };

  // Hanlde form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("dob", dob);
    data.append("st", st);
    data.append("gender", gender);
    data.append("jobLocation", jobLocation);
    data.append("pimage", pimage);
    data.append("rdoc", rdoc);
    if (name && email) {
      console.log(data);
      setError({
        status: true,
        msg: "Resume Uploaded Successfully.",
        type: "success",
      });
      resetForm();
    } else {
      setError({
        status: true,
        msg: "All Fields are Required.",
        type: "error",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ backgroundColor: "error.light", p: 2 }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Resume Uploader
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item sm={5}>
          <Box
            component="form"
            sx={{ p: 2 }}
            noValidate
            id="resume-form"
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              name="name"
              label="Name"
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              id="email"
              email="email"
              label="Email"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            {/* Date Picker */}
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => setdob(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            {/* State */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="state-slect-label">State</InputLabel>
              <Select
                labelId="state-slect-label"
                id="state-select"
                label="State"
                value={st}
                onChange={(e) => setst(e.target.value)}
              >
                <MenuItem value="">-------</MenuItem>
                <MenuItem value="pinjab">Punjab</MenuItem>
                <MenuItem value="sindh">Sindh</MenuItem>
                <MenuItem value="balochastan">Balochastan</MenuItem>
              </Select>
            </FormControl>
            {/* Gender */}
            <FormControl fullWidth margin="normal">
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup row aria-labelledby="gender-radio" name="gender">
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            {/* Loaction */}
            <FormControl component="fieldset" fullWidth margin="normal">
              <FormLabel component="legend">Preferred Job Locations:</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  value="Punjab"
                  control={<Checkbox />}
                  label="Punjab"
                  onChange={getjobLocation}
                />
                <FormControlLabel
                  value="Sindh"
                  control={<Checkbox />}
                  label="Sindh"
                  onChange={getjobLocation}
                />
                <FormControlLabel
                  value="Balochastan"
                  control={<Checkbox />}
                  label="Balochastan"
                  onChange={getjobLocation}
                />
              </FormGroup>
            </FormControl>
            {/* for Photo and PDF */}
            <Stack direction="row" spacing={4} mt={2}>
              <label htmlFor="Profile-photo">
                <Input
                  accept="image/*"
                  id="Profile-photo"
                  type="file"
                  onChange={(e) => setPImage(e.target.files[0])}
                />
                <Button variant="contained" component="span">
                  Upload Photo
                </Button>
              </label>
              <label htmlFor="resume-file">
                <Input
                  accept="doc/*"
                  id="resume-file"
                  type="file"
                  onChange={(e) => setRDoc(e.target.files[0])}
                />
                <Button variant="contained" component="span">
                  Upload CV
                </Button>
              </label>
            </Stack>
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              color="success"
            >
              Submit
            </Button>
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>

        <Grid item sm={7}>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ backgroundColor: "info.light", p: 1, mt: 4 }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              List of Candidates
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">SD Goraya</TableCell>
                  <TableCell align="center">sd@gmail.com</TableCell>
                  <TableCell align="center">1/1/1999</TableCell>
                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Punjab</TableCell>
                  <TableCell align="center">Lahore</TableCell>
                  <TableCell align="center">
                    <Avatar src="#" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
