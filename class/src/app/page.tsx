import Image from "next/image";
import { gql } from "@apollo/client";

import styles from "./page.module.css";
import { getClient } from "@/lib/client";

export default async function Home() {
  const client = getClient();

  return <></>;
}
