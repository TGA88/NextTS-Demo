import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import { Box, Button, Card, CardActions, CardContent, Link, Typography } from "@mui/material";
import { User } from "../../model/user";
import { RootState, useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { TextField } from "formik-material-ui";

type Props = {};
const classes: any = {
  root: { display: "flex", justifyContent: "center", margin: 16 },
};
export default function Login({}: Props) {
  const count= useSelector((state: RootState)=> state.counter.value);
  const dispatch = useAppDispatch()
  const showForm = ({
    isSubmitting,
    values,
  }: FormikProps<User>) => {
    return (
      <Form>
        <Box sx={classes.root}>
          <Card>
            <CardContent sx={{ padding: 2 }}>
              <Typography gutterBottom variant="h3">
                Login
              </Typography>
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="username"
                type="text"
                label="username"
              />
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="password"
                type="text"
                label="password"
              />
            </CardContent>
            <CardActions>
            <Button
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              login
            </Button>
            <Button variant="outlined" fullWidth>
              Cancl
            </Button>
          </CardActions>
          </Card>
        </Box>
      </Form>
    );
  };
  const initialValues: User = { username: "", password: "" };
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Box>
  );
}
