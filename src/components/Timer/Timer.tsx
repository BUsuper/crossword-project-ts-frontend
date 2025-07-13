import { useEffect, useState } from "react";
import type { JSX } from "react";
import "./Timer.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import stopIndicator from "../../assets/stop.svg";
import { selectIsFinished } from "../../slices/statusesSelectors";
import { setTime } from "../../slices/timeSlice";

export function Timer(): JSX.Element {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const isFinished = useAppSelector(selectIsFinished);

  const dispatch = useAppDispatch();

  // The callback is called when the component mounts and when isFinished is changed
  useEffect(() => {
    // If isFinished doesn't start another timer
    if (isFinished) {
      dispatch(setTime(elapsedTime));
      // If there is not timer, there is nothing to clean up
      return;
    }
    const timer = setInterval(() => {
      setElapsedTime((prev: number): number => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, elapsedTime, dispatch]);

  return (
    <div id="Timer">
      <img
        src={stopIndicator}
        id="stopIndicator"
        style={{ visibility: isFinished ? "visible" : "hidden" }}
      ></img>
      <p id="clock">{`${Math.floor(elapsedTime / 60)}:${String(
        elapsedTime % 60
      ).padStart(2, "0")}`}</p>
    </div>
  );
}
