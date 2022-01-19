window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js');
  }
  console.log("main!");
  
  if (!window.Worker) {
    return;
  }

  let count = 0;

  console.log("registerd workers");
  const log = msg => document.getElementById("log").innerHTML += `${msg}<br />`;
  const worker = new Worker("./worker.js");
  worker.onmessage = msg => log(`Recieved message: ${msg.data}, count: ${count++}`);

  document.getElementById("go").addEventListener("click", () => worker.postMessage("go"));
  document.getElementById("stop").addEventListener("click", () => worker.postMessage("stop"));

  window.onfocus = () => log("gained focus");
  window.onblur = () => log("lost focus");
}
