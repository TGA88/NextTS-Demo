import { Box, Button, Card, CardActionArea, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
type Props = {};

export default function dashboard({}: Props) {
  return (
    <Container>

      <Box className="grid grid-cols-3 gap-2 ">
        <Box >
          <Card sx={{ backgroundColor:"#00c0ef"}} >
            <CardContent >
              <Typography variant="h6" component="div" >
                INCOME
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                500 B
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card sx={{ backgroundColor:"#f6685e"}}>
            <CardContent>
              <Typography variant="h6" component="div">
                BALANCE
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                500 B
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card sx={{ backgroundColor:"#00a65a"}}>
            <CardContent>
              <Typography variant="h6" component="div">
                POINT
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                500 B
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* layout 2*/}
      <Card sx={{ backgroundColor:"#ffac33" ,mt:2}}>
        <Box className="grid grid-cols-6 gap-4">
          <Box className="col-start-1 col-end-3">
            {" "}
            <CardContent>
              <Typography variant="h6" component="div">
              FULLNAME
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                ADMIN
              </Typography>
            </CardContent>
          </Box>
          <Box className="col-end-7 col-span-2 ...">
            {" "}
            <CardContent>
              <Typography variant="h6" component="div">
                LEVEL
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                VIP
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </Card>
      {/* layout3 */}
      <Box className="grid grid-cols-2 gap-4 mt-3" >
        <Box >
        <Link  href={'../../topup/topup'}>
          <Card sx={{height:'5rem'}}>
              <Typography variant="h5" component="div" color="text.secondary">
                <CurrencyBitcoinIcon />
                แจ้งเตือนค่าใช้จ่าย
              </Typography>
          </Card>
          </Link>

        </Box>
        <Box>
        <Link  href={'../../status/status'}>
        <Card sx={{height:'5rem' , backgroundColor:"#ffffff"}}>
        <Typography variant="h5" component="div" color="text.secondary">
                <CurrencyBitcoinIcon />
                สถานะการฝาก
              </Typography>
          </Card>
          </Link>

        </Box>
        <Box>
        <CardActionArea>
          <Card sx={{height:'5rem' , backgroundColor:"#9e9e9e"}}>
              <Typography variant="h6" component="div" >
                COMINGSOON
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                500 B
              </Typography> */}
          </Card>
          </CardActionArea>
        </Box>
        <Box>
        <CardActionArea>
          <Card sx={{height:'5rem', backgroundColor:"#9e9e9e"}}>
              <Typography variant="h6" component="div" >
                COMINGSOON
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                500 B
              </Typography> */}
          </Card>
          </CardActionArea>
        </Box>
        <Box>
        <CardActionArea>
          <Card sx={{height:'5rem' , backgroundColor:"#9e9e9e"}}>
              <Typography variant="h6" component="div" >
                COMINGSOON
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                500 B
              </Typography> */}
          </Card>
          </CardActionArea>
        </Box>
        <Box>
        <CardActionArea>
          <Card sx={{height:'5rem' , backgroundColor:"#9e9e9e"}} >
              <Typography variant="h6" component="div" >
                COMINGSOON
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                500 B
              </Typography> */}
          </Card>
          </CardActionArea>
          <Button variant="contained" color="error" onClick={() => signOut({callbackUrl: '/'})}>Sign out</Button>

          {/* <Button variant="contained" color="error" onClick={() => signOut()}>Sign out</Button> */}

        </Box>
      </Box>
    </Container>
  );
}
