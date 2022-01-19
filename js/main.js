window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js');
  }

  /**
   * POC
   */
   let timeoutId = -1;
   const log = msg => {
     const msgContainer = document.createElement("div");
     msgContainer.innerText = msg;
     document.getElementById("log").appendChild(
       msgContainer
     );
   }
   let i = 0;
   let start = new Date().getTime();
   const tick = () => {
     const elapsed = Math.floor((new Date().getTime() - start) / 1000);
     log(`logging message ${i++} at ${elapsed} seconds elapsed`);
     

     timeoutId = setTimeout(tick, 1000);
   }

   document.getElementById("go").addEventListener("click", () => {
     if (timeoutId < 0) {
       tick();
     }
   });

   document.getElementById("stop").addEventListener("click", () => {
     clearTimeout(timeoutId);
     timeoutId = -1;
     console.log("stopped");
   })

   window.onfocus = () => {
     log("gained focus")
   }

   window.onblur = () => log("lost focus");
}
