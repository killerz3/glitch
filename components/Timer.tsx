"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TfiClose } from "react-icons/tfi";
import { Button } from "./Button";

function Timer() {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [TimerStatus, setTimerStatus] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [date, setdate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [efficiency, setEfficiency] = useState<any>();

  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const TimeRef = useRef<any>();
  const handleStart = () => {
    setTimerStatus(true);
    let startTime = Date.now();
    
    const updateTimer = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      const totalSeconds = Math.floor(elapsedTime / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      if (TimerStatus) {
        requestAnimationFrame(updateTimer);
      }
    };

    requestAnimationFrame(updateTimer);
  };

  const handleModalSubmit = async () => {
    await axios.post("/api/AddSession", {
      email: session?.user?.email,
      title,
      description,
      efficiency: parseInt(efficiency),
      time: hours * 3600 + minutes * 60 + seconds,
      isPublic: checked,
    });
  };

  const handleEnd = () => {
    clearInterval(TimeRef.current);

    setTimerStatus(false);
  };

  const handleReset = () => {
    handleEnd();
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="">
      <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
        <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
          <span className="countdown font-mono text-5xl">
            {/* @ts-ignore*/}
            <span style={{ "--value": hours }}>{hours}</span>
          </span>
          hours
        </div>
        <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
          <span className="countdown font-mono text-5xl">
            {/* @ts-ignore*/}
            <span style={{ "--value": minutes }}>{minutes}</span>
          </span>
          min
        </div>
        <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
          <span className="countdown font-mono text-5xl">
            {/* @ts-ignore*/}
            <span style={{ "--value": seconds }}>{seconds}</span>
          </span>
          sec
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center transition-all duration-500">
        <button
          onClick={TimerStatus ? handleEnd : handleStart}
          className={`btn ${TimerStatus ? "btn-warning" : "btn-primary"}`}
        >
          {TimerStatus
            ? "pause"
            : seconds > 0 || minutes > 0 || hours > 0
            ? "resume"
            : "start"}
        </button>

        {(seconds > 0 || minutes > 0 || hours > 0) && (
          <button className="btn-error btn ml-2" onClick={handleReset}>
            Reset
          </button>
        )}
        {(seconds > 0 || minutes > 0 || hours > 0) && (
          <label
            onClick={handleEnd}
            htmlFor="my-modal-add"
            className="btn-secondary btn ml-2 hover:bg-secondary"
          >
            Finish
          </label>
        )}

        <div>
          <input type="checkbox" id="my-modal-add" className="modal-toggle" />
          <label
            htmlFor="my-modal-add"
            className="modal modal-bottom cursor-pointer sm:modal-middle"
          >
            <div className="relative h-5/6 w-9/12 rounded-xl border-4 border-primary bg-base-100 p-5 backdrop-blur-xl">
              {" "}
              <label htmlFor=" ">
                <h3 className="p-4 text-3xl font-bold">
                  Congratulations{" "}
                  <span className="text-secondary hover:text-info">
                    {session?.user?.name}
                  </span>{" "}
                  on completing your session!
                </h3>
                <h3 className="mt-1 p-4 text-2xl font-semibold">
                  Here are your session details,
                </h3>
                <div className="flex flex-col py-4">
                  <label
                    htmlFor="my-modal-add"
                    className="btn-sm btn-circle btn absolute right-2 top-2"
                  >
                    <TfiClose className="text-xl text-secondary" />
                  </label>
                  <span className="mx-5 py-3 text-xl">
                    Session time: <span className="text-primary">{hours}</span>{" "}
                    Hours <span className="text-primary">{minutes}</span> Mins{" "}
                    <span className="text-primary">{seconds}</span> Secs{" "}
                  </span>
                  <div className="absolute right-10 top-1/2 mr-10 flex items-center">
                    <span className="mr-5 text-xl">Post it Publicly</span>
                    <input
                      type="checkbox"
                      className="toggle-accent toggle"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                  </div>
                  <p className="mx-5 py-3 text-lg">Title</p>
                  <span>
                    <input
                      type="text"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Type here"
                      className="input-bordered input ml-4 w-full max-w-xs border-black text-lg"
                    />
                  </span>
                  <p className="mx-5 py-3 text-lg">Description</p>
                  <span>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      placeholder="Type here"
                      className="input-bordered input ml-4 w-full max-w-xs border-black text-lg"
                    />
                  </span>
                  <p className="mx-5 py-3 text-lg">Efficiency</p>
                  <div className="max-w-2" />
                  <div className="ml-7 w-4/5">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={efficiency}
                      className="range range-primary m-2"
                      step="10"
                      onChange={(e) => {
                        setEfficiency(e.target.value);
                      }}
                    />
                    <div className="text-md flex w-full justify-between px-3 py-2">
                      <span className="text-primary">1</span>
                      <span className="text-primary">2</span>
                      <span className="text-primary">3</span>
                      <span className="text-primary">4</span>
                      <span className="text-primary">5</span>
                      <span className="text-primary">6</span>
                      <span className="text-primary">7</span>
                      <span className="text-primary">8</span>
                      <span className="text-primary">9</span>
                      <span className="text-primary">10</span>
                    </div>
                  </div>
                </div>
                <div onClick={handleModalSubmit} className="modal-action">
                  <label
                    htmlFor="my-modal-add"
                    className="btn-secondary btn hover:btn-info"
                  >
                    Submit
                  </label>
                </div>
              </label>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Timer;
