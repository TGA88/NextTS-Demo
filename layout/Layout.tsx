import { Grid } from '@mui/material'
import React, { ReactNode } from 'react'
import DashboardCard from './DashboardCard/DashboardCard'
import Header from './Header/Header'

interface ILayoutProps {
    children:ReactNode
}
export default function Layout({children}: ILayoutProps) {
  return (
    <>
    <Header />
    <Grid style={{marginBottom: 16,display: "flex",
          alignItems: "center",
          justifyContent: "center" }} />

    {children}
    </>
  )
}