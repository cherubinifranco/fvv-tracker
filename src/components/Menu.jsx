import { useEffect, useState } from "react";
import { ClockIcon, ClockIconBig, ExitIcon } from "../assets/icons";
import { parseTimeMinimal } from "../utils";
const testData = [
  { date: "26/12", time: "10800" },
  { date: "25/12", time: "11700" },
  { date: "24/12", time: "16200" },
  { date: "23/12", time: "14215" },
  { date: "22/12", time: "13555" },
  { date: "21/12", time: "12112" },
  { date: "20/12", time: "12313" },
  { date: "19/12", time: "30302" },
  { date: "18/12", time: "22222" },
  { date: "17/12", time: "12321" },
  { date: "16/12", time: "22112" },
  { date: "15/12", time: "41000" },
  { date: "14/12", time: "10800" },
  { date: "13/12", time: "10800" },
  { date: "12/12", time: "10800" },
];

export default function Menu() {
  const [pastSessions, updatePastSessions] = useState([]);
  useEffect(() => {
    const pastSessionsLS =
      JSON.parse(localStorage.getItem("pastSessions")) || [];
    updatePastSessions(pastSessionsLS);
  }, []);
  return (
    <aside className="w-96 h-screen bg-secondarybg flex flex-col justify-between">
      <div className="m-3  bg-thirdbg rounded">
        <div className="inline-flex items-center gap-3 text-swhite p-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-accent text-center leading-9 text-xl">
            A
          </div>
          <h1>Aorlian12</h1>
        </div>
        <div className="bg-secondarybg h-[3px]"></div>
        <div className="p-4">
          <span className="text-soft pl-1 indent-2 font-semibold">
            Total time last 7 days:
          </span>
          <h1 className="inline-flex items-center gap-2 text-2xl text-swhite font-regular py-1">
            <span className="text-accent">{ClockIconBig}</span>
            {parseTimeMinimal(
              testData
                .slice(0, 10)
                .reduce((acumm, curr) => acumm + curr.time * 1, 0)
            )}
          </h1>
        </div>
      </div>

      <h1 className="p-4 pb-0 w-full text-center text-soft font-light tracking-wide">
        Past Sessions
      </h1>
      <div className="bg-soft h-[1px] mx-4 my-3"></div>
      <div className="h-full overflow-y-auto px-3">
        {testData.slice(0, 10).map((el, index) => (
          <div
            className="h-10 p-3 bg-thirdbg rounded-xl my-2 inline-flex items-center w-full"
            key={"psessions" + index}
          >
            <p className="text-soft">{el.date}</p>
            <div className="h-[1px] w-full bg-soft mx-2 rounded"></div>
            <p className="text-swhite font-semibold tracking-wide inline-flex items-center">
              <span className="text-accent mr-1">{ClockIcon}</span>
              {parseTimeMinimal(el.time)}
              <span className="text-soft text-sm ml-1">hs</span>
            </p>
          </div>
        ))}
      </div>
      <div className="bg-soft h-[1px] mx-4 mt-2"></div>
      <button
        onClick={() => console.log("Log out")}
        className="bottom-0 h-12 m-3 p-2 rounded inline-flex items-center gap-2 text-soft hover:bg-thirdbg hover:text-swhite"
      >
        {ExitIcon}Log out
      </button>
    </aside>
  );
}
