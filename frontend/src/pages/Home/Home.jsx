import React from "react";
import Hero from "./Hero/Hero";
import HeroContainer from "./Hero/HeroContainer";
import Gallary from "./Gallary/Gallary";
import PopularClasses from "./PopularClasses/PopularClasses";
import Popularteacher from "./PopularTeacher/Popularteacher";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  // console.log(import.meta.env.VITE_APIKEY)
  // const {user} = useAuth();
  // console.log(user)

  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallary />
        <PopularClasses />
        <Popularteacher />
      </div>
    </section>
  );
};

export default Home;
 