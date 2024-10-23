import React, { useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import img from "../assets/home/girl.jpg"; // Corrected image import

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get("instructors")
      .then((data) => {
        setInstructors(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Our <span className="text-secondary">Amazing</span> Instructors
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500">
            Explore our popular classes. Here are some popular instructors based
            on student enrollment.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructors.length > 0 ? (
          <div className="grid mb-28 md:grid-cols-2 lg:grid-cols-3 w-[90%] gap-4 mx-auto">
            {instructors.map((instructor, i) => (
              <div
                key={i}
                className="flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md"
              >
                <div className="flex-col flex gap-6 md:gap-8">
                  <img
                    className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                    src={instructor?.photoUrl || img} // Fallback to default image
                    alt={instructor?.name || "Instructor"}
                  />
                  <div className="flex flex-col text-center">
                    <p className="font-medium text-lg text-gray-800">
                      {instructor?.name || "Unknown Instructor"}
                    </p>
                    <p className="text-gray-500">Instructor</p>
                    <p className="text-gray-500 mb-4">Address: {instructor?.address || "N/A"}</p>
                    <p className="text-gray-500 mb-4">Email: {instructor?.email || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No instructors available</p>
        )}
      </div>
    </div>
  );
};

export default Instructors;
