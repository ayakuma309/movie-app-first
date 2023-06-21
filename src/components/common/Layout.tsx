import React from 'react'
import Head from "next/head";
import Header from "./Header";
import { CommonTypeProps } from "@/types/Types"

import Footer  from './Footer';
const Layout: React.FC<CommonTypeProps> = (
  {
    children,
    title = 'Movie Wizard',
  }
) => {
  return (
    <div className="min-h-screen items-center justify-center font-mono">
      <Head>
        <title>{title}</title>
        <meta name="description" content="映画見つけたい!!" />
        <meta
          name="og:title"
          property="og:title"
          content={title}
        />
        <meta
          name="description"
          content="映画見つけたい!!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex max-w-screen-sm flex-1 sm:w-screen sm:max-w-screen-xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
