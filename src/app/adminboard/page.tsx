'use client';
import { useSession } from "next-auth/react";
import styles from "./history.module.css";

export default function ShowOrderView() {

  const session = useSession();

  if (session.status == "authenticated" && session.data?.user?.claims["canReadAdminContent"]) {
    return (
      <>
        
      </>
    )
  }
}
