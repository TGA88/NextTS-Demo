import { Box, Button, Card, CardActions, CardContent, Container, TextField, Typography, LinearProgress } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from '@mui/material';

type Props = {}

export default function uploadBody({}: Props) {
  const [link, setLink] = useState<any>('')
  const [short, setShort] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const handleChange = (e:any) => {
    const { target } = e
    const { name } = target
    const value = target.value
    console.log(value);
    // setInput((prev)=>{
    //   return {
    //     ...prev,
    //     [name]: value,
    //   }
      
    // })
  }

  const remove = () => {
    setLink('')
    setShort('')
  }

  const checkLink = (string:any) => {
    // Regex to check if string is a valid URL
    console.log(string)
    return string.match(HTTP_URL_VALIDATOR_REGEX);
  };

  const getLink = async (link:any) => {
    console.log(link)
        try {
          const url = await axios.get(`https://api.shrtco.de/v2/shorten?url=${link}`)
          console.log(url.data.result.short_link)
          setShort(url.data.result.short_link) 
          setIsLoading(false);
        } catch (error) {
          console.log(error)
          
        }
  };


// show

      const onSubmit = async (e: any) => {
        if (checkLink(link)) {
        e.preventDefault();
          getLink(link);
          // setLink('');
          setIsLoading(!isLoading);
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
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
            <TextField style={{ marginTop: 16 }} fullWidth value={link} onChange={(e) => setLink(e.target.value)}></TextField><br />
    
       </form>
       </CardContent>
       <CardActions>
       {!isLoading && (<Button onClick={(e) => onSubmit(e)} fullWidth variant="contained" color="primary"  sx={{ marginRight: 1 }}>submit</Button>)}     
              <Button  variant="contained" color='error' fullWidth onClick={remove}>
                Cancl
              </Button> 
              
            </CardActions>
            <>
            <Typography sx={{ padding: 2 }} gutterBottom variant="h6">
            Short Link: <Link rel='noopener' target='_blank'href={`https://${short}`}>{short}</Link>
              </Typography>
        </>
        </Card>
    </Box>
    <br />

    </Container>
    </>
  )
}