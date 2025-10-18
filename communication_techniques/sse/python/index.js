console.log("script executed")
const eventSource = new EventSource("http://13.53.32.8/test_route")
eventSource.onmessage = (event) => {
    console.log("Received message:", event.data )
}
eventSource.addEventListener('ENDSTREAM', function(event) {
    console.log('End Stream recieved closing eventsource', event.data);
    eventSource.close();
});
console.log(eventSource)