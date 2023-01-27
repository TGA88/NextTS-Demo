import {
  Container,
  Box,
  Card,
  CardActionArea,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {};

export default function topup({}: Props) {
  return (
    <Container>
      <Box className="grid grid-cols-1 gap-4 mt-3rem  ">
        <Typography gutterBottom variant="h3" sx={{ textAlign: "center" }}>
          TOPUP
        </Typography>
        <CardActionArea>
          <Card sx={{ height: "5rem", backgroundColor: "#ffffff" }}>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              10000 B
            </Typography>
          </Card>
        </CardActionArea>
        <CardActionArea>
          <Card sx={{ height: "5rem", backgroundColor: "#ffffff" }}>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              30000 B
            </Typography>
          </Card>
        </CardActionArea>
        <CardActionArea>
          <Card sx={{ height: "5rem", backgroundColor: "#ffffff" }}>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              50000 B
            </Typography>
          </Card>
        </CardActionArea>
        <CardActionArea>
          <Card sx={{ height: "5rem", backgroundColor: "#ffffff" }}>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              100000 B
            </Typography>
          </Card>
        </CardActionArea>
        <CardActionArea>
          <Card sx={{ height: "5rem", backgroundColor: "#ffffff" }}>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              300000 B
            </Typography>
          </Card>
        </CardActionArea>
        <CardActionArea>
          <Card sx={{ height: "5rem", backgroundColor: "#ffffff" }}>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              500000 B
            </Typography>
          </Card>
        </CardActionArea>
        <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "0.2rem",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                  >
                    รักษายอดรายเดือน
                  </Button>
                  <Link href="/dashboard/dashboard" passHref>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginLeft: 1 }}
                    >
                      กลับ
                    </Button>
                    </Link>
                </Box>
      </Box>
 
    </Container>
  );
}
