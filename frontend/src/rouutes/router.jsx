import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home"
import Instructors from "../pages/Instructors";
import Classes from "../pages/classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/classes/SingleClass";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>, 
      children:[
        {
            path:"/",
            element: <Home/>
        },
        {
            path:"instructors",
            element: <Instructors/>
        },
        {
            path:"classes",
            element: <Classes/>
        },
        {
          path: "/login",
          element:<Login/>
        },
        {
          path: "/register",
          element:<Register/>
        },
        {
          path:"/class/:id",
          element:<SingleClass/>,
          loader:({params})=> fetch(`http://localhost:5000/class/${params.id}`)
             }
           
        
      ]
    },
  ]);