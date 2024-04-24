const usersList = document.getElementById("users");
const board = document.getElementById("board");
const userMessage = document.getElementById("msg_txt");
const userName = document.getElementById("msg_name");
const sendButton = document.getElementById("msg_btn");

const socket = io.connect("");

userName.value = `user #${Math.floor(Math.random() * 1000)}`;

socket.emit("newUser", userName.value);

const messages = [];

const LIMIT_MESSAGES = 10;

const render = (htmlElement, elements) => {
    htmlElement.innerHTML = "";
    htmlElement.append(...elements);
};

const renderListOfMessages = ({ name, message, color }) => {
    const divName = document.createElement("div");
    divName.classList.add("alert", "alert-primary", "col-md-3");
    divName.textContent = name;
    divName.style.backgroundColor = `#${color}`;

    const divMessage = document.createElement("div");
    divMessage.classList.add("alert", "alert-dark", "col-md-9");
    divMessage.textContent = message;

    const divWrapper = document.createElement("div");
    divWrapper.classList.add("row");

    divWrapper.appendChild(divName);
    divWrapper.appendChild(divMessage);

    if (messages.unshift(divWrapper) > LIMIT_MESSAGES) {
        messages.pop();
    }

    render(board, messages);
};

const renderListOfUsers = (data) => {
    console.log(Object.values(data));
    const userElement = Object.values(data).map((user) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.style.backgroundColor = `#${user.color}`;
        li.innerText = user.name;

        return li;
    });
    render(usersList, userElement);
};

socket.on("user", renderListOfUsers);
socket.on("message", renderListOfMessages);

const sendUserMessage = () => {
    const name = userName.value;
    const message = userMessage.value;

    if (message === "" || name === "") {
        return;
    }

    socket.emit("message", {
        message,
        name,
    });

    userMessage.value = "";
    userMessage.focus();
};

const pressEnterKey = (e) => {
    if (e.keyCode === 13) {
        sendUserMessage();
    }
};

sendButton.addEventListener("click", sendUserMessage);
userMessage.addEventListener("keyup", pressEnterKey);