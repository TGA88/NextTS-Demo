import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Profile } from '../../model/profile'
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {};

export default function profilebk({}: Props) {
    const { data: session } = useSession()
  const [user, setUser] = useState<Profile>({
    name: "",
    surname: "",
    email: "",
    tel:'',
    id_card:0,
    bookbank:0
  });
  const handleChange = (e: any) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;
    // console.log(value);
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  function handleChangeFile(event: any) {
    setFile(event.target.files[0]);
  }

  const [file, setFile] = useState<any>();
  const [base64, setBase64] = useState<string>();
  const [name, setName] = useState<string>();
  const [size, setSize] = useState<string>();
  const [imagePreview, setImagePreview] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const remove = () => {
    setFile("");
    setImagePreview("");
    setBase64("");
    setName("");
    setSize("");
  };

  // show
  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file);
        setSize(file.size);
        setName(file.name);
        setName(file.type);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onFileSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
        console.log(user)

    const url = await axios.post(
      "http://localhost:3000/api/customer/create",user
    );
    console.log(url);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
    
  if (session) {

  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 4}}>
          <Card>
            <CardContent sx={{ padding: 2 }}>
              <Typography gutterBottom variant="h3">
              Persanal Profile
              </Typography>
              <div>
             <img src={session.user.picture} style={{ margin: 16, height: 150 }}/>
                </div>
                {/* <div><img src={imagePreview} style={{ margin: 16, height: 150 }} /></div>
              <input
                  style={{ marginTop: 16 }}
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpef, .png, .jpg"
                  onChange={(e) => photoUpload(e)}
                /> */}
        
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="name"
                    defaultValue={user.name}
                    name="name"
                    onChange={handleChange}
                  ></TextField>
                  <br />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="surname"
                    defaultValue={user.surname}
                    name="surname"
                    onChange={handleChange}
                  ></TextField>
                  <br />
                </Grid>
              </Grid>
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  variant="standard"
                  label="email"
                  defaultValue={user.email}
                  name="email"
                  onChange={handleChange}
                ></TextField>
                <br />
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  variant="standard"
                  label="tel"
                  defaultValue={user.tel}
                  name="tel"
                  onChange={handleChange}
                ></TextField>
                <br />
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  variant="standard"
                  label="ID Card"
                  defaultValue={user.id_card}
                  name="id_card"
                  onChange={handleChange}
                ></TextField>
                <br />
                <TextField
                  style={{ marginTop: 16 }}
                  fullWidth
                  variant="standard"
                  label="Book Bank"
                  defaultValue={user.bookbank}
                  name="bookbank"
                  onChange={handleChange}
                ></TextField>
                <br />
            </CardContent>
            <CardActions>
              <Button
                onClick={(e) => onFileSubmit(e)}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginRight: 1 }}
              >
                submit
              </Button>
              <Button variant="contained" color="error" fullWidth>
                Cancl
              </Button>
            </CardActions>
          </Card>
        </Box>
        <br />
      </Container>
    </>
  );
}
}
