import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <h1 className="text-red-700 font-bold ">{session?.user?.name}</h1>
      <img
        src={session?.user?.image!}
        alt=""
        className="w-[128px] h-32 rounded-full"
      />
      {session ? (
        <button onClick={() => signOut()} className="bg-blue-400">
          Sign out
        </button>
      ) : (
        <button onClick={() => signIn()} className="bg-blue-400">
          Sign in
        </button>
      )}
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}
