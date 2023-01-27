import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import DashboardCard from "../../layout/DashboardCard/DashboardCard";
// import DashboardCard from '../../layout/DashboardCard/DashboardCard';
type Props = {};

export default function dashboard({}: Props) {
  return (
    <Container>
    <Box>
      {/* <Grid style={{marginBottom: 16 }} /> */}
      <Grid
        container
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={2}
      >
        <Grid item lg={3.5} sm={6}>
  
                    <DashboardCard
            // icon={() => <Button>Test</Button>}
            title="POINT "
            subtitle="5. THB"
            color="#00c0ef"
          />
        </Grid>

        <Grid item lg={3.5} sm={6}>
          <DashboardCard
            // icon={() => <Button>Test</Button>}
            title="BALANCE"
            subtitle="200. THB"
            color="#f39c12"
          />
        </Grid>

        <Grid item lg={3.5} sm={6}>
        <DashboardCard
          // icon={() => <Button>Test</Button>}
            title="INCOME"
            subtitle="2,000 THB"
            color="#00a65a"
          />
        </Grid>
        
      </Grid>
 
    </Box>
    </Container>

  );
}
