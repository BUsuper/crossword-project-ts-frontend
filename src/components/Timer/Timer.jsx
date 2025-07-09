import { useEffect, useState } from "react";
import "./Timer.css";
import { useDispatch, useSelector } from "react-redux";
import stopIndicator from "../../assets/stop.svg";
import { selectIsFinished } from "../../slices/statusesSelectors";
import { setTime } from "../../slices/statusesSlice";

export function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const isFinished = useSelector(selectIsFinished);

  const dispatch = useDispatch();

  // The callback is called when the component mounts and when isFinished is changed
  useEffect(() => {
    // If isFinished don't start another timer
    if (isFinished) {
      dispatch(setTime(elapsedTime));
      // If there is not timer, there is nothing to clean up
      return;
    }
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  return (
    <div id="Timer">
      <img
        src={stopIndicator}
        id="stopIndicator"
        style={{ visibility: isFinished ? "visible" : "hidden" }}
      ></img>
      <p id="clock">{`${(elapsedTime - (elapsedTime % 60)) / 60}:${String(
        elapsedTime % 60
      ).padStart(2, "0")}`}</p>
    </div>
  );
}
