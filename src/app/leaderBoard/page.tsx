import React from "react";
import Dot from "@/components/dot/Dot";
import { FaChartBar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

export default function page() {
  return (
    <div className="flex items-center justify-center w-full text-white select-none">
      <div className="grid">
        {/*--------- header dot section ----------*/}
        <section className="flex justify-center bg-neutral-700 p-2 mb-1 rounded-t-2xl ml-10 mr-10">
          <Dot text="Welcome to leader board" dotColor="bg-white" textColor="text-white" speed={50} />
        </section>
        {/*--------- main logo section ----------*/}
        <section className="grid bg-neutral-700 rounded-4xl p-7">
          <div className="mb-6">
            <p>Welcome to the leader board section where you can see and compare you scores with others</p>
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex items-center gap-2 bg-neutral-900 px-5 py-2 rounded-xl">
              <FaChartBar />
              <p>Compare you score</p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900 px-5 py-2 rounded-xl">
              <FaUsers />
              <p>See others score</p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900 px-5 py-2 rounded-xl">
              <FaTrophy />
              <p>Compite against others</p>
            </div>
          </div>
          {/*--------- body data section ----------*/}
          <section className="grid">
            <h1>user data will be shown here</h1>
          </section>
        </section>
      </div>
    </div>
  );
}
