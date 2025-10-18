console.log("script executed");
const eventSource = new EventSource("http://localhost:8080/sse");
const eventList = document.getElementById("events-list");

eventSource.onmessage = (event) => {
  console.log("Received message:", typeof JSON.parse(event.data));
  const listItem = document.createElement("li");
  listItem.textContent = `${JSON.parse(event.data).message}`;
  eventList.appendChild(listItem);
};
eventSource.addEventListener("ENDSTREAM", function (event) {
  console.log("End Stream recieved closing eventsource", event.data);
  eventSource.close();
  const listItem = document.createElement("li");
  listItem.textContent = `Message: ${event.data}`;
  eventList.appendChild(listItem);
});
console.log(eventSource);
