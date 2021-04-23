import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../src/styles.css";
import { Button, Box, Typography } from "@material-ui/core";
import useSound from "use-sound";
import bellRing from "../bell-ring.mp3";

const CountDown = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const [play] = useSound(bellRing, { interrupt: true });

  const toggle = () => {
    setIsActive(!isActive);
  };

  const resetCountDownTimer = () => {
    setIsActive(true);
    setMinutes(0);
    setSeconds(10);
  };

  const onChangeMinute = () => {
    const minuteInputValue = minuteRef.current.value;
    if (minuteInputValue >= 0) {
      setMinutes(Number(minuteInputValue));
    }
  };

  const onChangeSecond = () => {
    const secondInputValue = secondRef.current.value;
    // we use greater than zero otherwise when user give 0 always show done :(
    if (secondInputValue > 0) {
      setSeconds(Number(secondInputValue));
    }
  };

  const setMinutesSeconds = () => {
    const minuteInputValue = minuteRef.current.value;
    const secondInputValue = secondRef.current.value;
    if (minuteInputValue >= 0 && secondInputValue >= 0) {
      setMinutes(Number(minuteInputValue));
      setSeconds(Number(secondInputValue));
    }
  };

  useEffect(() => {
    let myInterval;
    if (!isActive) {
      myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            // Play After Done
            console.log("Done");
            play();
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            // If seconds equal 00 we set 59 count down
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [play, isActive, minutes, seconds]);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Vibely CountDown
      </Typography>
      {minutes === 0 && seconds === 0 ? (
        <div>
          <h1 className="done">Done</h1>
          {/* <button
            onClick={() => {
              setMinutes(0);
              setIsActive(true);
              return setSeconds(10);
            }}
          >
            Restart
          </button> */}
          <Button
            size={"small"}
            variant="outlined"
            color="secondary"
            onClick={() => {
              setMinutes(0);
              setIsActive(true);
              return setSeconds(10);
            }}
          >
            Restart
          </Button>
        </div>
      ) : (
        <div>
          <div className="inputDiv">
            {/* <TextField
              type="number"
              placeholder="Minutes"
              name="minutes"
              inputRef={minuteRef}
              onChange={onChangeMinute}
              label="Minutes"
            />
            <TextField
              type="number"
              name="seconds"
              inputRef={secondRef}
              onChange={onChangeSecond}
              label="Seconds"
            /> */}
            <input
              type="number"
              placeholder="Minutes"
              name="minutes"
              ref={minuteRef}
              onChange={onChangeMinute}
            />

            <input
              type="number"
              placeholder="Seconds"
              name="seconds"
              ref={secondRef}
              onChange={onChangeSecond}
            />
            <Button
              variant="outlined"
              color="primary"
              size={"small"}
              onClick={setMinutesSeconds}
            >
              Set
            </Button>
          </div>
          <div className="timer">
            {" "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              size={"small"}
              onClick={toggle}
            >
              {isActive ? "Start" : "Stop"}
            </Button>
            <Button
              size={"small"}
              variant="outlined"
              color="secondary"
              onClick={resetCountDownTimer}
            >
              Reset
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default CountDown;
