import { Box, Button, Card, CardActions, CardContent, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

type Props = {}

export default function uploadBody({}: Props) {
  const [input, setInput] = useState<any>({
    url:'',
  })
  const handleChange = (e:any) => {
    const { target } = e
    const { name } = target
    const value = target.value
    // console.log(value);
    // setInput((prev)=>{
    //   return {
    //     ...prev,
    //     [name]: value,
    //   }
      
    // })
  }

    const [isLoading, setIsLoading] = useState<boolean>(false)

// show

      const onFileSubmit = async (e: any) => {
        console.log(e)
        setIsLoading(true)
        e.preventDefault()
        // const url = await axios.post("http://localhost:3000/api/customer/upload",formData);
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
                Short Link URL 
              </Typography>
          {/* <form onChange={(e) => onChangeBase64(e)}> */}
          <form >
            {/* <TextField style={{ marginTop: 16 }} fullWidth defaultValue={input.fname} name= "fname" onChange={handleChange}></TextField><br /> */}
            <TextField style={{ marginTop: 16 }} fullWidth defaultValue={input.url} name= "url" onChange={handleChange}></TextField><br />
    
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