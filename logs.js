const logsContent = document.getElementsByClassName('logs__content')[0];
const logsForm = document.getElementsByClassName('logs__form')[0];
const logsButton = document.getElementsByClassName('logs__button')[0];
let isLogsOpen = false;

logsContent.style.display = 'none';

logsButton.addEventListener('click', (event) => {
    isLogsOpen = !isLogsOpen;
    if (isLogsOpen) {
        logsContent.style = '';
    } else {
        logsContent.style.display = 'none';
    }
});

logsForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const chatInput = document.getElementsByClassName('logs__input')[0];
    const chatWindow = document.getElementsByClassName('logs__window')[0];

    const newMessage = document.createElement('div');
    newMessage.classList.add('logs__message');
    newMessage.textContent = chatInput.value;

    chatWindow.appendChild(newMessage);

    chatInput.value = '';

    chatWindow.scrollTop = chatWindow.scrollHeight;
});