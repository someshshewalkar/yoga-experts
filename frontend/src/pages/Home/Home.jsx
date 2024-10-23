import React from "react";
import Hero from "./Hero/Hero";
import HeroContainer from "./Hero/HeroContainer";
import Gallary from "./Gallary/Gallary";
import PopularClasses from "./PopularClasses/PopularClasses";
import Popularteacher from "./PopularTeacher/Popularteacher";

const Home = () => {
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
 