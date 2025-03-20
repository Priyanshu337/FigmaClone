"use client";
import LeftsideBar from "@/components/LeftsideBar";
import Live from "../components/Live";
import { Room } from "./Room";
import Navbar from "@/components/Navbar";
import RightsideBar from "@/components/RightsideBar";
import { useEffect, useRef, useState } from 'react';
import { fabric } from "fabric";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "../lib/canvas";
import { ActiveElement } from "../../types/type";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<String | null>('rectangle');

  const [activeElement, setActiveElement] =
    useState<ActiveElement>({
      name: '',
      value: '',
      icon: ''
    })

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);
    selectedShapeRef.current = elem?.value as string
  };

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })

    canvas.on("mouse:down", (options: any) => {
      handleCanvasMouseDown({ canvas, options, isDrawing, shapeRef, selectedShapeRef });
    })

    window.addEventListener("resize", () => {
      handleResize({ fabricRef })
    })
  }, [])

  return (
    <>
      <div className="h-screen overflow-hidden">
        < Navbar
          activeElement={activeElement}
          handleActiveElement={handleActiveElement}
        />
        <section className="flex h-full dlex-row">
          <LeftsideBar />
          <Room>
            < Live canvasRef={canvasRef} />
          </Room >
          <RightsideBar />
        </section>

      </div >
    </>
  );
}
