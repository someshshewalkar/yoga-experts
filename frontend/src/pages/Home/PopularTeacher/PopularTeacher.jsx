import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import img from "../../../assets/home/girl.jpg"; 

const Popularteacher = () => {
  const [instructors, setInstructors] = useState([]);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get("popular-instructors")
      .then((data) => {
        setInstructors(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36 px-4">
      <div>
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
          Our <span className="text-secondary">Amazing</span> Instructors
        </h1>
        <div className="w-[60%] text-center mx-auto my-4">
          <p className="text-gray-500">
            Explore our popular classes, here are some popular instructors based on how many students enrolled.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {instructors.length > 0 ? (
          instructors.map((instructor, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center p-6">
                <div className="relative w-32 h-32 mb-4">
                  <img
                    className="rounded-full border-4 border-gray-300 object-cover w-full h-full"
                    src={instructor?.instructor?.photoUrl || img} // Fallback to default image
                    alt={instructor?.instructor?.name || "Instructor"}
                  />
                </div>

                <div className="text-center">
                  <p className="font-medium text-lg text-gray-800">
                    {instructor?.instructor?.name || "Unknown Instructor"}
                  </p>
                  <p className="text-gray-500">Instructor</p>
                  <p className="text-sm text-gray-400 mb-2">
                    Total Students: {instructor?.totalEntrolled || 0}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-8">No instructors available</p>
        )}
      </div>
    </div>
  );
};

export default Popularteacher;
