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
import { Profile } from "../../model/profile";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {};

export default function profile({}: Props) {
  const { data: session }: any = useSession();
  const [user, setUser] = useState<Profile>({
    dataUser:{
      name: "",
      surname: "",
      email: "",
      tel: "",
      id_card: "",
      bookbank: "",
    },
    provider_login:{
      providerUid:"",
      providerSource:"",
      img:"",
      providerType:"",
      displayName:""
    }
  

  });
  // const [provider, setProvider] = useState<ProviderLogin>({
  //   providerUid:"",
  //   providerSource:"",
  //   img:"",
  //   providerType:"",
  //   displayName:""
  // });
  const handleChange = (e: any) => {
    const { value ,name} = e.target;
    const tempUser = {...user}
    tempUser.dataUser[name] = value 
    setUser(tempUser)
  };
  function handleChangeFile(event: any) {
    setFile(event.target.files[0]);
  }

  const [file, setFile] = useState<any>();
  const [base64, setBase64] = useState<string>();
  const [name, setName] = useState<string>();
  const [size, setSize] = useState<string>();
  const [imagePreview, setImagePreview] = useState<any>();
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
    // provider.providerUid = session.user.sub
    // provider.providerSource = session.user.provider
    // provider.img = imagePreview ?  imagePreview : session.user.picture
    // provider.providerType = "default"
    user.provider_login = {
      providerUid:session.user.sub,
      providerSource: session.user.provider,
      providerType: "default",
      img: imagePreview ?  imagePreview : session.user.picture,
      displayName: session.user.name
    }
    console.log(user);
    const url = await axios.post("http://localhost:3000/api/customer/create", {user,
      headers: {
      'ax-provider-source':'ax-provider-source',
      'value': session.user.provider,
      'Authorization':`Bearer ${session.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     
    },
    });
    console.log(url);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  if (session) {
    return (
      <>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Card>
            <Grid
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ padding: 2 }}>
                <Typography
                  gutterBottom
                  variant="h3"
                  sx={{ textAlign: "center" }}
                >
                  Persanal Profile
                </Typography>
                <div>
                  <img
                    src={imagePreview ? imagePreview : session.user.picture}
                    style={{ marginLeft: "2rem", height: "11rem" }}
                  />
                </div>
                <input
                  style={{ marginTop: 16 }}
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpef, .png, .jpg"
                  onChange={(e) => photoUpload(e)}
                />
                <Box>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="name"
                    defaultValue={user.dataUser.name}
                    name="name"
                    onChange={handleChange}
                  ></TextField>
                </Box>
                <Box>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="surname"
                    defaultValue={user.dataUser.surname}
                    name="surname"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="email"
                    defaultValue={user.dataUser.email}
                    name="email"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="tel"
                    defaultValue={user.dataUser.tel}
                    name="tel"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="ID Card"
                    defaultValue={user.dataUser.id_card}
                    name="id_card"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    style={{ marginTop: 16 }}
                    fullWidth
                    variant="standard"
                    label="Book Bank"
                    defaultValue={user.dataUser.bookbank}
                    name="bookbank"
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    onClick={(e) => onFileSubmit(e)}
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                  >
                    submit
                  </Button>
                  <Link href="/dashboard/dashboard" passHref>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: 1 }}
                  >
                    BACK
                  </Button>
                  </Link>
                </Box>
              </CardContent>
            </Grid>
          </Card>
        </Box>
      </>
    );
  }
}
