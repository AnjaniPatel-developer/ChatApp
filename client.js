const socket = io("http://localhost:8000");
const first = document.querySelector(".first");
const message = document.querySelector("#message");

const name = prompt("Enter Your Name To Join The Group Chat");
socket.emit("user-joined", name);

function generateMessage(text, side) {
    let msg = document.createElement("div");
    msg.classList.add("alert");

    if (side === "left") {
        msg.classList.add("alert-primary", "left");
    } else if (side === "right") {
        msg.classList.add("alert-warning", "right");
    } else {
        msg.classList.add("alert-light", "center");
    }

    msg.innerHTML = text;
    first.appendChild(msg);
}

socket.on("new-user-joined", (name) => {
    if (name) generateMessage(`${name} joined the chat`, 'center');
});

function postMessage() {
    if (message.value !== "") {
        generateMessage(`You: ${message.value}`, "right");
        socket.emit("send", message.value);
        message.value = "";
    }
}

message.addEventListener("keypress", (e) => {
    if (e.key === "Enter") postMessage();
});

socket.on("receive", ({ message, name }) => {
    generateMessage(`${name}: ${message}`, 'left');
});

socket.on("user-left", (name) => {
    generateMessage(`${name} left the chat`, 'center');
});