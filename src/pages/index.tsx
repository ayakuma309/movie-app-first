import Layout from "@/components/common/Layout";
import TopContents from "@/components/toppage/TopContents";
import { NextPage } from "next"
import React
from "react"
const Home:NextPage = () => {
  return (
    <Layout title='Cinema Wizard'>
      <div className='container flex flex-col items-center sm:max-w-7xl'>
        <div className='container mt-24'>
          <TopContents />
        </div>
      </div>
    </Layout>
  )
}
export default Home;
