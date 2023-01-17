import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
  } from "@mui/material";
  import { FormikProps, Form, Field, Formik } from "formik";
  import { TextField } from "formik-material-ui";
  import * as React from "react";
  import { Customer } from "../../model/customer";
//   import * as stockActions from "./../../../actions/stock.action";
//   import { useAppDispatch } from "../../..";
  type StockCreatePageProps = {
    //
  };
  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 150 }} />;
    }
  };
  
  const StockCreatePage: React.FC<any> = () => {
    // const dispatch = useAppDispatch();
    const showForm = ({
      values,
      setFieldValue,
      isSubmitting,
    }: FormikProps<Customer>) => {
      return (
        <Form>
          <Card>
            <CardContent sx={{ padding: 2 }}>
              <Typography gutterBottom variant="h3">
                Create Stock
              </Typography>
  
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="username"
                type="text"
                label="Name"
              />
              <br />
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="price"
                type="number"
                label="Price"
              />
  
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="stock"
                type="number"
                label="Stock"
              />
  
              <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>
  
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                  style={{ width: 25, height: 20 }}
                />
                <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                  Add Picture
                </span>
  
                <input
                  type="file"
                  onChange={(e: React.ChangeEvent<any>) => {
                    //   e.preventDefault() ป้องกันการรีเฟซ
                    e.preventDefault();
                    setFieldValue("file", e.target.files[0]); // for upload
                    setFieldValue(
                      "file_obj",
                      URL.createObjectURL(e.target.files[0])
                    ); // for preview image
                  }}
                  name="image"
                  click-type="type1"
                  multiple
                  accept="image/*"
                  id="files"
                  style={{ padding: "20px 0 0 20px" }}
                />
              </div>
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
                Create
              </Button>
              <Button  variant="outlined" fullWidth>
                Cancl
              </Button>
            </CardActions>
          </Card>
        </Form>
      );
    };
    // ค่าเริ่มต้น
    const initialValues: Customer = { username: "", fname: "", lname: "" };
    return (
      <Box>
        <Formik
          // validate
          validate={(values) => {
            let errors: any = {};
            if (!values.username) errors.name = "Enter name";
            return errors;
          }}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            // alert(JSON.stringify(values));
            // create
            let formData = new FormData();
            formData.append("username", String(values.username));
            formData.append("fname", String(values.fname));
            formData.append("lname", String(values.lname));
            formData.append("lname", String(values.lname));

            // formData.append("image", values.file);
            // dispatch(stockActions.addProduct(formData));
            setSubmitting(false);
          }}
        >
          {(props: any) => showForm(props)}
        </Formik>
      </Box>
    );
  };
  
  export default StockCreatePage;
  