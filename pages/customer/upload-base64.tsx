import { Box, Button, Card, CardActions, CardContent, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Customer } from '../../model/customer'

type Props = {}

export default function uploadBase64({}: Props) {
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

    const [file, setFile] = useState<string>()
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

    const onChangeBase64 = async (e: any) => {
      // show img
      const reader = new FileReader()
      const file = e.target.files[0]
      if (reader !== undefined && file !== undefined) {
        reader.onloadend = () => {
          setFile(file)
          setSize(file.size)
          setName(file.name)
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
      }
        if (file) {
          const reader = new FileReader()
          reader.onload = _handleReaderLoaded
          reader.readAsBinaryString(file)
          
        }
      }
      const _handleReaderLoaded = (readerEvt: any) => {
        let binaryString = readerEvt.target.result
        setBase64(btoa(binaryString))
      }
// show
    // const photoUpload = (e: any) => {
    //     e.preventDefault()
    //     const reader = new FileReader()
    //     const file = e.target.files[0]

    //     if (reader !== undefined && file !== undefined) {
    //       reader.onloadend = () => {
    //         setFile(file)
    //         setSize(file.size)
    //         setName(file.name)
    //         setImagePreview(reader.result)
    //       }
    //       reader.readAsDataURL(file)
    //     }
    //   }
      const onFileSubmit = async (e: any) => {
        console.log(e)
        setIsLoading(true)
        e.preventDefault()
        let payload = { image: base64 ,fname:input.fname}
        console.log(payload)
        // console.log(payload)
        const url = await axios.post("http://localhost:3000/api/customer/encode",payload);
    
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }

  return (
    <>
    <Container>
    <Box sx={{ display: "flex", justifyContent: "center", margin:3 }}>
        <Card sx={{ minWidth: 400 }}>
        <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h3">
                Create Image Base64
              </Typography>
          {/* <form onChange={(e) => onChangeBase64(e)}> */}
          <form >
            {/* <TextField style={{ marginTop: 16 }} fullWidth defaultValue={input.fname} name= "fname" onChange={handleChange}></TextField><br /> */}
        <input
        style={{ marginTop: 16 }}
              type='file'
              name='file'
              id='file'
              accept='.jpef, .png, .jpg'
              onChange={(e)=>onChangeBase64(e)}
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