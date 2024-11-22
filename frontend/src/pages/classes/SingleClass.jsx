import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { DialogActions } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { GiClassicalKnowledge } from "react-icons/gi";

const SingleClass = () => {
  const course = useLoaderData(); // Ensure this line is declared first
//   const course = courses[0]; // Safely access the first course

  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  return (
    <>
      <div
        className="font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
      >
        {/* header */}
        <div className="breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
          <div className="container text-center">
            <h2>Course Details</h2>
          </div>
        </div>

        <div className="nav-tab-wrapper tabs section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
              <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={course?.image}
                      alt="Course Thumbnail"
                      className="rounded-md object-fit w-full h-full block"
                    />
                  </div>
                  <h2 className="text-2xl mb-2">
                    {course?.title || "UI/UX Design and Graphics Learning Bootcamp 2024"}
                  </h2>
                  <div className="author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 ww-12 rounded">
                          <img
                            src={course?.instructorImage}
                            alt=""
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-secondary">
                          Trainer:
                          <a href="#" className="text-black">
                            {" "}
                            {course?.instructorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-secondary">
                        Last Update:
                        <a href="#" className="text-black ml-1">
                          {new Date(course?.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="nav-tab-wrapper mt-12">
                    <ul id="tabs-nav" className="course-tab mb-8">
                      <li className="active">
                        <a href="#tab1">Overview</a>
                      </li>
                      <li>
                        <a href="#tab2">Curriculum</a>
                      </li>
                      <li>
                        <a href="#tab3">Instructor</a>
                      </li>
                      <li>
                        <a href="#tab4">Reviews</a>
                      </li>
                    </ul>
                    <div id="tabs-content">
                      <div id="tab1" className="tab-content">
                        <div>
                          <h3 className="text-2xl mt-8">Course Description</h3>
                          <p className="mt-4">
                            {course?.description ||
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                          </p>
                          <div className="bg-[#f8f8f8] dark:bg-indigo-50 space-y-6 p-8 rounded-md my-8">
                            <h4 className="text-2xl">What you will Learn?</h4>
                            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                              {course?.learningPoints?.map((point, index) => (
                                <li key={index} className="flex space-x-3">
                                  <div className="flex-none relative top-1">
                                    <img src="/correct-mark.png" alt="" />
                                  </div>
                                  <div className="flex-1">{point}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <h4 className="text-2xl">Requirements</h4>
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                          {course?.requirements?.map((requirement, index) => (
                            <div
                              key={index}
                              className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center"
                            >
                              <span className="flex-none">
                                <img src="/logo.png" alt="" />
                              </span>
                              <span className="flex-1 text-black">{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Add content for other tabs similarly */}
                    </div>
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                <div className="sidebar-wrapper space-y-[38px]">
                  <div className="widget custom-text space-y-5">
                    <a className="h-[220px] rounded relative block" href="#">
                      <img
                        src={course?.image}
                        alt="Course Thumbnail"
                        className="block w-full h-full object-cover rounded"
                      />
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src="/play.png" alt="" />
                      </div>
                    </a>

                    <h3>${course?.price}</h3>

                    <button
                      onClick={() => handleSelect(course.id)}
                      title={
                        role === "admin" || role === "instructor"
                          ? "Instructor/Admin cannot select"
                          : course?.availableSeats < 1
                          ? "No seat available"
                          : "You can select this class"
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        course?.availableSeats < 1
                      }
                      className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white"
                    >
                      Enroll Now
                    </button>

                    <ul className="list">
                      <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUser className="inline-flex" />
                          <div className="text-black font-semibold">Instructor</div>
                        </div>
                        <div className="flex-none">{course?.instructorName}</div>
                      </li>

                      <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4">
                        <div className="flex-1 space-x-3 flex items-center">
                          <MdBookOnline />
                          <div className="text-black font-semibold">Lectures</div>
                        </div>
                        <div className="flex-none">23</div>
                      </li>

                      <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4">
                        <div className="flex-1 space-x-3 flex items-center">
                          <BiTime />
                          <div className="text-black font-semibold">Duration</div>
                        </div>
                        <div className="flex-none">2Hr 36Minutes</div>
                      </li>

                      <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUsers />
                          <div className="text-black font-semibold">Enrolled</div>
                        </div>
                        <div className="flex-none">273</div>
                      </li>

                      <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaLevelUpAlt />
                          <div className="text-black font-semibold">Course level</div>
                        </div>
                        <div className="flex-none">Intermediate</div>
                      </li>

                      <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4">
                      <div className="flex-1 space-x-3 flex items-center">
                          <FaLanguage />
                          <div className="text-black font-semibold">Language</div>
                        </div>
                        <div className="flex-none">English</div>
                      </li>

                      {/* Add additional list items as required */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;


