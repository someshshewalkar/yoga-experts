import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { CSSTransition } from "react-transition-group";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ultilities/providers/AuthProvider";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [hoverdCard, setHouredCard] = useState(null);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEntrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log("The user is :",currentUser.email)

  const handleHover = (index) => {
    setHouredCard(index);
  };

  useEffect(() => {
    axiosFetch
      .get("classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err)); // error yeu shkte ithe
  }, []);
  // console.log(classes)

  //handle add to card
  // const handleSelect = (id) => {
  //   // Check if currentUser exists
  //   if (!currentUser) {
  //     return toast.error("Please Login first");
  //   }

  //   // Get enrolled classes
  //   axiosSecure
  //     .get(`/enrolled-classes/${currentUser?.email}`)
  //     .then((res) => setEntrolledClasses(res.data))
  //     .catch((err) => console.log(err));

  //   // Check if the user has already selected the class
  //   axiosSecure
  //     .get(`/card-item/${currentUser.email}`)
  //     .then((res) => {
  //       if (res.data.clasId === id) {
  //         return alert("Already Selected");
  //       } else if (enrolledClasses.find((item) => item.classes._id === id)) {
  //         return alert("Already Enrolled");
  //       } else {
  //         const data = {
  //           clasId: id,
  //           userMail: currentUser.email,
  //           data: new Date(),
  //         }

  //         axiosSecure.post("/add-to-card", data)
  //         .then(res =>{
  //           console.log(res.data)
  //         })

  //     }
  //     })

  // };

  const handleSelect = (id) => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => setEntrolledClasses(res.data))
      .catch((err) => {
        console.log(err);
      });
      if(!currentUser){
        alert("please login first")
        return  Navigate("/login")
      }

      axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`).then(res=>{
        if(res.data.classId === id){
          return alert("Alredy Selected")
        } else if(enrolledClasses.find(item => item.classes._id === id)){
          return alert("already Enrolled")
        } else{
          const data ={
            classId: id,
            userMail: currentUser?.email,
            data:new Date()
          }
          axiosSecure.post('/add-to-cart', data).then(res=>{
            alert("Added to the card Succesfully !")
            console.log(res.data)
          })
        }
      })
  };

  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Classes
        </h1>
      </div>
      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8">
        {classes.map((cls, index) => {
          return (
            <div
              onMouseLeave={() => handleHover(null)}
              key={index}
              className={`relative hover:-translate-y-2 duratino-150 hover:ring-[2px] hover:ring-secondary w-64 h-[360px]  m-auto ${
                cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
              } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer `}
              onMouseEnter={() => handleHover(index)}
            >
              <div className="relative h-48">
                <div
                  className={`absolute insert-0 bg-black opacity-0 transition-opacity duration-300 ${
                    hoverdCard === index ? "opacity-60" : ""
                  }
                 `}
                />
                <img
                  src={cls.image}
                  alt=""
                  className="object-cover w-full  h-full"
                />

                <Transition
                  show={hoverdCard === index}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center ">
                    <button
                      onClick={() => handleSelect(cls._id)}
                      title={
                        role == "admin" || role == "instructor"
                          ? "Instructor/Admin Can not be able to select"
                            ? cls.availableSeats < 1
                            : "No Seat Available"
                          : "You can select classes"
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        cls.availableSeats < 1
                      }
                      className="px-4 py-2 text-white disabled:bg:red-300 bg-secondary duration-300 rounded hover:bg-red-700"
                    >
                      Add to cart
                    </button>
                  </div>
                </Transition>
              </div>
              {/*details*/}
              <div className="px-6 py-2">
                <h3 className="font-semibold"> {cls.name}</h3>
                <p className="text-gray-500 text-xs">
                  Instructor : {cls.instructorName}{" "}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span>Available Seats : {cls.availableSeats}</span>
                  <span className="text-green-500 font-semibold">
                    {" "}
                    ${cls.price}
                  </span>
                </div>
                <Link to={`/class/${cls._id}`}>
                  <button className="px-4 py-2 mt-4 mb-2 w-full mx-auto  text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                    View
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;
