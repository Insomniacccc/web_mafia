const countForm = document.getElementsByClassName('count-form')[0];
const playersForm = document.getElementsByClassName('players-form')[0];
const table = document.getElementsByClassName('table')[0];
const error = document.getElementsByClassName('error')[0];
const countValue = document.getElementsByClassName('count-form__count-input')[0];

function setRoles(playerArray) {
    const mafCount  = playerArray.length < 9 ? 2 : 3;
    return playerArray.map((player, index) => {
        if (index < mafCount - 1) {
            return {...player, role: 'mafia'};
        }

        if (index < mafCount) {
            return {...player, role: 'don'};
        }

        if (index === mafCount) {
            return {...player, role: 'sherif'};
        }

        return player;
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function setVisibility(elem, isVisible) {
    if (isVisible) {
        elem.style = '';
        return;
    }

    elem.style.display = 'none';
}

const playerInputs = [];
const playersState = {};
const players = [];

function deletePlayer(index) {
    playersState[index].player.style.color = 'gray';
    setVisibility(playersState[index].delete, false);
    setVisibility(playersState[index].reborn, true);
}

function rebornPlayer(index) {
    playersState[index].player.style = '';
    setVisibility(playersState[index].reborn, false);
    setVisibility(playersState[index].delete, true);
}

function handlePlayersSubmit(event) {
    event.preventDefault();
    setVisibility(error, false);

    if (playerInputs.some(playerInput => playerInput.value === '')) {
        error.innerText = "Вы ввели ники не всех игроков";
        setVisibility(error, true);
        return;
    }

    playerInputs.forEach(playerInput => players.push({ name: playerInput.value, role: 'civil' }));

    shuffle(setRoles(shuffle(players))).forEach((player, index) => {
        const playerElem = document.createElement('div');
        const playerNick = document.createElement('div');
        const playerRole = document.createElement('div');
        const playerDelete = document.createElement('button');
        const playerReborn = document.createElement('button');
        playerDelete.classList.add('table__player-delete');
        playerReborn.classList.add('table__player-reborn');
        playerDelete.innerHTML =
            '<svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" fill="black"/>\n' +
            '</svg>';
        playerReborn.innerHTML =
            '<svg width="40" height="40" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">\n' +
            '<rect x="11" y="4" width="2" height="16" rx="1" fill="currentColor"/>\n' +
            '<rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor"/>\n' +
            '</svg>';
        playerRole.classList.add('table__player-role');
        playerRole.innerText = player.role;
        playerNick.classList.add('table__player-nick');
        const playerNumber = document.createElement('span');
        playerNumber.classList.add('table__player-number');
        playerNick.innerText = player.name;
        playerNumber.innerText = `${index + 1}`;
        playerElem.appendChild(playerNumber);
        playerElem.appendChild(playerNick);
        playerElem.appendChild(playerRole);
        playerElem.appendChild(playerDelete);
        playerElem.appendChild(playerReborn);
        playerDelete.addEventListener('click', () => deletePlayer(index));
        playerReborn.addEventListener('click', () => rebornPlayer(index));
        playersState[index] = {
            player: playerElem,
            delete: playerDelete,
            reborn: playerReborn
        }
        setVisibility(playerReborn, false);
        playerElem.classList.add('table__player');
        playerElem.classList.add(`table__player_${index + 1}`)
        playerElem.classList.add(`table__player_${player.role}`);
        table.appendChild(playerElem);
        table.classList.add(`table_players_${players.length}`);
    });

    setVisibility(playersForm, false);
    setVisibility(table, true);
}


function handleCountSubmit(event) {
    event.preventDefault();
    setVisibility(error, false);
    const value = countValue.value;

    if (value < 7 || value > 10) {
        error.innerText = "Вы ввели недопустимое количество игроков";
        setVisibility(error, true);
        return;
    }

    for (let i = value; i >= 1; i--) {
        const player = document.createElement('label');
        player.classList.add('players-form__player');
        const playerText = document.createElement('span');
        playerText.classList.add('players-form__player-text');
        playerText.innerText = `Введите ник игрока номер ${i}`;
        const playerInput = document.createElement('input');
        playerInput.classList.add('players-form__player-input');
        player.appendChild(playerText);
        player.appendChild(playerInput);
        playerInputs.push(playerInput);
        playersForm.insertBefore(player, playersForm.firstChild);
    }

    setVisibility(playersForm, true);
    setVisibility(countForm, false);
}

setVisibility(error, false);
setVisibility(table, false);
setVisibility(playersForm, false);

countForm.addEventListener('submit', handleCountSubmit);
playersForm.addEventListener('submit', handlePlayersSubmit);



