"use client";
import LeftsideBar from "@/components/LeftsideBar";
import Live from "../components/Live";
import { Room } from "./Room";
import Navbar from "@/components/Navbar";
import RightsideBar from "@/components/RightsideBar";

export default function Page() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        < Navbar />
        <section className="flex h-full dlex-row">
          <LeftsideBar />
          <Room>
            < Live />
          </Room >
          <RightsideBar />
        </section>

      </div >
    </>
  );
}
