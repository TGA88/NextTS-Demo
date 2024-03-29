import { Stack, Button } from "@mui/material";
import { count } from "console";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../store/slices/counterSlice";
import { RootState, useAppDispatch } from "../store/store";
import styles from "../styles/Home.module.css";
import Componets from "../components/login-btn";
import Signin from "../pages/signin";
import { useEffect, useState } from "react";
import Header from "../layout/Header/Header";
import Dashboard from "./dashboard/dashboardbackup";
import { useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import axios from "axios";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch()
  const { data: session }: any = useSession();
  const dispatch = useAppDispatch();
  const [numb, setNumb] = useState();
  useEffect(() => {
    // if (session) {
    //   getProvider();
    // }
  });
  // const getProvider = async () => {
  //   const playload = await axios.get(
  //     `http://localhost:3000/api/customer/get-provider/${session.user.id}`
  //   );
  //   if (playload.data) {
  //     router.push("../dashboard/dashboard");
  //   } else {
  //     router.push("../profile/profile");
  //   }
  //   // if(session){
  //   //   playload.data.forEach((element:any) => {
  //   //     element.loingProvider.forEach((data:any) => {
  //   //       console.log("data")
  //   //       if(data.providerUid){
  //   //         router.push('../dashboard/dashboard')
  //   //       }

  //   //     })
  //   //   }
  //   //   )
  //   // }else{
  //   //     router.push('../profile/profile')
  //   // }
  //   // console.log(element)
  // };
  // useEffect(() => {
  //   console.log('App useEffect numb' + numb)
  // },[numb])
  // const test = () => {
  //   <Link href={'/dashboard/dashboard'}></Link>
  // }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Dashboard/> */}

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {/* <h1 className="text-3xl font-bold underline">
             Hello world! Tailwind
        </h1> */}
        <br />

        {session && (
          <Link href={"http://localhost:3000"}>
            <Button variant="contained">go to dashboard</Button>
          </Link>
        )}

        {/* <Button onClick={() => (setNumb(prev => prev+1))}  variant="contained">{numb}</Button>

        <h1>the value of counter is {count}</h1>
      <Stack spacing={2} direction="row"> 
      <Button color="success" onClick={() => dispatch(increment())} variant="contained">+</Button>
      <Button color="error" onClick={() => dispatch(decrement())} variant="contained">-</Button>
      <Button onClick={() => dispatch(incrementByAmount(2))} variant="contained">+2</Button>

    </Stack><br/> */}
        <Componets />
      </main>
    </div>
  );
}
