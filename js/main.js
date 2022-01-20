window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js');
  }
  console.log("main!");
  
  if (true) {
    return;
  }

  let count = 0;
  let start = new Date().getTime();

  console.log("registerd workers");

  const log = msg => document.getElementById("log").innerHTML += `${msg}<br />`;

  const worker = new Worker("./worker.js");
  worker.onmessage = msg => {
    const elapsed = Math.floor((new Date().getTime() - start) / 1000);
    log(`Main: #${count++} @ ${elapsed} secs`);
    log(msg.data);
  }

  document.getElementById("go").addEventListener("click", () => worker.postMessage("go"));
  document.getElementById("stop").addEventListener("click", () => worker.postMessage("stop"));

  window.onfocus = () => log("gained focus");
  window.onblur = () => log("lost focus");
}
