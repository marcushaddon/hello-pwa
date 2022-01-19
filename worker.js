let start = new Date().getTime();
let count = 0;
let timeout = -1;

const tick = () => {
  postMessage(count++);
  timeout = setTimeout(tick, 1000);
}

onmessage = event => {
  if (event.data === "go" && timeout === -1) {
    tick();
  } else if (event.data === "stop") {
    clearTimeout(timeout);
    timeout = -1;
  }
}