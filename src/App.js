//TODO: STEP 1 - Import the useState hook.
import React, { useState} from "react";
import BottomRow from "./BottomRow";
import "./App.css";
import { useEffect } from "react";



function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const homeTeam = new Team("Lions", "home")
  const awayTeam = new Team("Tigers", "away")
  const [seconds, setSeconds] = useState(10)
  const [minutes, setMinutes] = useState(0)
  const [isActive, setIsActive] = useState(true)
  useEffect(() =>{
    let interval = null
    if(isActive){
    interval = setInterval(() => {
      if(seconds <= 0){
        if(minutes<= 0){
          setIsActive(false);
          return () => clearInterval(interval)
        }
        setMinutes(minutes => minutes-1)
        setSeconds(59)
      }
      else{
        setSeconds(seconds => seconds-1)
      }
    }, 1000)
  }
    return () => clearInterval(interval)
  }, [minutes, seconds, isActive])
  
  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <TeamDisplay team={homeTeam} />
  <div className="timer">{minutes<10 ? "0"+minutes : minutes}:{seconds<10 ? "0"+seconds : seconds}</div>
          <TeamDisplay team={awayTeam} />
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <ScoreButton team={homeTeam} />
        <ScoreButton team={awayTeam} />
      </section>
    </div>
  );
}

function TeamDisplay(props){
  return (
    <div className={props.team.location}>
            <h2 className={props.team.location + "__name"}>{props.team.teamName}</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}
            <div className={props.team.location + "__score"}>{props.team.score}</div>
          </div>
  )
}

function ScoreButton(props){
  return (
    <div className={props.team.location + "Buttons"}>
      <button className={props.team.location + "Buttons__touchdown"} onClick={() => props.team.addPoints(7)}>{props.team.teamName} Touchdown</button>
      <button className={props.team.location + "Buttons__fieldGoal"} onClick={() => props.team.addPoints(3)}>{props.team.teamName} Field Goal</button>
    </div>
  )
}

class Team {
  constructor(name, location){
    this.teamName = name;
    this.location = location;
    [this.score, this.setScore] = useState(0)
    this.gameRunning = true;
  }
  addPoints(points){
    this.gameRunning ? this.setScore(this.score + points) : this.setScore(this.score)
  }
}

export default App;
