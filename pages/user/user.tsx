import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { User } from "../../model/user";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import axios from "axios";

interface Props {
  data: User[];
}
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fname', headerName: 'First name', width: 130 },
  { field: 'lname', headerName: 'Last name', width: 130 },
  { field: 'username', headerName: 'username', width: 130 },
];

const classes: any = {
  root: { display: "flex", justifyContent: "center", margin:3 },
};


const getUser = async (e: any) => {
  console.log(e)
  e.preventDefault()
  try {
    const url = await axios.get("http://localhost:3000/api/customer");
    console.log(url)
  } catch (error) {
    console.log(error)
  }
  // setTimeout(() => {
  // }, 2000)
}

export default function user({ data }: Props) {
  return (
    <>
    <Box sx={classes.root}>
          <Card sx={{ minWidth: 600 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography variant="body2">
        <DataGrid
       sx={{ backgroundColor: "white", height: "70vh" }}
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

      {/* <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h1>{item.id}</h1>
            <div>{item.fname} {item.lname}</div>
          </li>
        ))}
      </ul> */}
      {/* <form onSubmit={(e) => onFileSubmit(e)} encType="multipart/form-data">
        <input type="file" name="avatar" />
        <Button type='submit'>Submit</Button>
    </form> */}
            <Button onClick={getUser}>Submit</Button>

    </Box>
    </>
  );
}


export const getStaticProps: GetStaticProps = async (context) => {
  const url = "https://www.melivecode.com/api/users";
  const res = await fetch(url);
  const result = await res.json();
  const data: User = result;
  return {
    props: {
      data,
    },
  };
};
