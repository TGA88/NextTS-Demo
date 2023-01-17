import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { publicClientApplication } from '@azure/msal-react'
import { MsalProvider } from '@azure/msal-react';

export interface authState {
    username: string
    password: string
    token: string
    loading:boolean
    error: string
  }

const initialState: authState = {
    username: "",
    password: "",
    token: "",
    error:"",
    loading:false,
  }
  
//   const pca = publicClientApplication({
//     auth:{
//         clientId:''
//     }
//   })
//   const loginUser = createAsyncThunk('user', async(body) => {
//     const res = await fetch("" , {
//         method: 'post',
//     })
//   })

export const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginAD:(state, action) => {
        }
    },
  })

  export default authSlice.reducer