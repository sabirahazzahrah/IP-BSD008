import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../component/headers";
import Corausel from "../component/carousel";
import Testimoni from "../component/testimoni";

const Home = () => {
  return (
    <>
      <body className="container  h-screen max-w-screen-xl dark:bg-gray-500 dark:text-gray-800">
        <section>
          <Header />
        </section>
        <section>
          <Corausel />
        </section>
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <Testimoni />
        </section>
      </body>
    </>
  );
};

export default Home;
