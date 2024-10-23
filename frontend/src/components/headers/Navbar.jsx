import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import {motion} from "framer-motion"
import photoURL from '../../assets/home/girl.jpg'
import {FaBars} from "react-icons/fa"
const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];
const materialTheme = createTheme({
    palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [scorllPositioin, setScrollPositon] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState("bg-[#15151580]");
const  [user,setUser]=useState(true); 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);



  useEffect(() => {
  const handleScroll = ()=>{
    const currentPosition = window.pageYOffset;
    setScrollPositon(currentPosition);

  };
  window.addEventListener('scroll',handleScroll);
  return ()=> window.removeEventListener('scroll',handleScroll)
  }, [])
  

  useEffect(() => {
    if (scorllPositioin > 100) {
      if (isHome) {
        setNavBg(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black"
        );
      }
      else{
        setNavBg('bg-white dark:bg-black dark:text-white text-black')
      }
    }
    else{
        setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent'  : 'bg-white dark:bg-black'}`)
    }
  }, [scorllPositioin]);


  //logout
  const handelLogout =()=>{
    console.log("logout")
  }

  return (
    <motion.nav
    initial={{opacity:0}}
    animate = {{opacity:1}}
    transition={{duration:0.5}}
     className={`${isHome? navBg:"bg-white dark:bg-black backdrop-bluer-2xl"} ${isFixed ? 'static' : 'fixed'} top-0 transiton-colors duration-500 ease-in-out w-full z-10`}>
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* {logo} */}
          <div onClick={()=>navigate('/')} className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center">
            <h1 className="text-2xl inline-flex gap-2 items-center font-bold ">
              YogaExperts{" "}
              {/* <img src="/yoga-logo.png" alt="" className="w-12 h-12 " /> */}
            </h1>
          </div>
          {/* for mobile  navigation*/}
        <div className="md:hidden flex item-center">
           <button type="button" onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
            <FaBars className="h-6 w-6 hover:text-primary" />
           </button>
        </div>


          <div className="hidden md:block text-black dark:text-white">
            <ul className="ml-10 flex items-center space-x-4 pr-4">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <NavLink
                    to={link.route}
                    style={{whiteSpace:"nowrap"}}
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {
                user ? null : isLogin ?   <li>
               
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `font-bold ${
                      isActive
                        ? "text-secondary"
                        : `${
                            navBg.includes("bg-transparent")
                              ? "text-white"
                              : "text-black dark:text-white"
                          }`
                    } hover:text-secondary duration-300`
                  }
                >
                  Register
                </NavLink>
              </li> :   <li>
            
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `font-bold ${
                      isActive
                        ? "text-secondary"
                        : `${
                            navBg.includes("bg-transparent")
                              ? "text-white"
                              : "text-black dark:text-white"
                          }`
                    } hover:text-secondary duration-300`
                  }
                >
                  Login
                </NavLink>{" "}
              </li>
              } 
{ 
   user && <li>
                <NavLink to='/dashboard' className={({ isActive }) =>
                    `font-bold ${
                      isActive
                        ? "text-secondary"
                        : `${
                            navBg.includes("bg-transparent")
                              ? "text-white"
                              : "text-black dark:text-white"
                          }`
                    } hover:text-secondary duration-300`
                  }>Dashboard</NavLink>
              </li>

}
{
  user && <li>
    <img src={photoURL} alt="" className="h-[40px] rounded-full w-[40px]" />
  </li>
}

{
  user && <li >
    <NavLink onClick={handelLogout} className = {'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>Logout</NavLink>
  </li>
}
             
            
              <li>
              <ThemeProvider theme={materialTheme}> 
                <div className="flex flex-col justify-center items-center"> <Switch onChange={()=>setIsDarkMode(!isDarkMode)}/> 
                    <h1 className="text-[8px] ">light/dark</h1> </div>
      </ThemeProvider>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
