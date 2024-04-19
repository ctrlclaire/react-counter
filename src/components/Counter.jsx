import React from "react";
import GithubApi from "./GithubApi";

export default function Counter() {
  let [counter, setCounter] = React.useState(0);

  function handleClickIncrements() {
    setCounter(counter + 1);
  }

  function handleClickDecrements() {
    setCounter(counter - 1);
  }

  return (
    <>
      <button onClick={handleClickIncrements}>Incremente</button>
      <button onClick={handleClickDecrements}>Decremente</button>
      <h1>{counter}</h1>
      <GithubApi />
    </>
  );
}
