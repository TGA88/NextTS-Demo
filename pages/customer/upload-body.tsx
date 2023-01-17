import { Box, Button, Card, CardActions, CardContent, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Customer } from '../../model/customer'

type Props = {}

export default function uploadBody({}: Props) {
  const [input, setInput] = useState<Customer>({
    fname:'',
    lname:'',
    username:''
  })
  const handleChange = (e:any) => {
    const { target } = e
    const { name } = target
    const value = target.value
    // console.log(value);
    setInput((prev)=>{
      return {
        ...prev,
        [name]: value,
      }
      
    })
  }
  function handleChangeFile(event:any) {
    setFile(event.target.files[0])
  }

    const [file, setFile] = useState<any>()
    const [base64, setBase64] = useState<string>()
    const [name, setName] = useState<string>()
    const [size, setSize] = useState<string>()
    const [imagePreview, setImagePreview] = useState<any>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const remove = () => {
      setFile('')
      setImagePreview('')
      setBase64('')
      setName('')
      setSize('')
      
    }

// show
    const photoUpload = (e: any) => {
        e.preventDefault()
        const reader = new FileReader()
        const file = e.target.files[0]
        console.log(file)
        if (reader !== undefined && file !== undefined) {
          reader.onloadend = () => {
            setFile(file)
            setSize(file.size)
            setName(file.name)
            setName(file.type)
            setImagePreview(reader.result)
          }
          reader.readAsDataURL(file)
        }
      }
      const onFileSubmit = async (e: any) => {
        console.log(e)
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('fullname', input.lname);

        const url = await axios.post("http://localhost:3000/api/customer/upload",formData);
        console.log(url)
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }

  return (
    <>
    <Container>
    <Box sx={{ display: "flex", justifyContent: "center", margin:12 }}>
        <Card sx={{ minWidth: 400 }} >
        <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h3">
                Create Image 
              </Typography>
          {/* <form onChange={(e) => onChangeBase64(e)}> */}
          <form >
            {/* <TextField style={{ marginTop: 16 }} fullWidth defaultValue={input.fname} name= "fname" onChange={handleChange}></TextField><br /> */}
            <TextField style={{ marginTop: 16 }} fullWidth defaultValue={input.lname} name= "lname" onChange={handleChange}></TextField><br />

        <input
        style={{ marginTop: 16 }}
              type='file'
              name='file'
              id='file'
              accept='.jpef, .png, .jpg'
              onChange={(e)=>photoUpload(e)}
            />
      <div><img src={imagePreview}  style={{ margin: 16 ,height: 150  }} />
      
      </div>
    
       </form>
       </CardContent>
       <CardActions>
       <Button onClick={(e) => onFileSubmit(e)} fullWidth
                variant="contained"
                color="primary"  sx={{ marginRight: 1 }}>submit</Button>
              <Button  variant="contained" color='error' fullWidth>
                Cancl
              </Button>
            </CardActions>
        </Card>
    </Box>
    <br />

    </Container>
    </>
  )
}