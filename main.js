let currentSelectedGame = "";

// Game select karne par lobby screen par le jaane ke liye
function openLobby(gameId) {
    currentSelectedGame = gameId;
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("lobby-screen").classList.remove("hidden");
    
    // Title badalne ke liye
    let gameName = gameId === 'tank-game' ? 'MECHA TANK FIGHT' : 'CHAMELEON RACE';
    document.getElementById("selected-game-title").innerText = "LOBBY: " + gameName;
}

// Back button dabane par menu me jaane ke liye
function backToMenu() {
    document.getElementById("main-menu").classList.remove("hidden");
    document.getElementById("lobby-screen").classList.add("hidden");
}

// Room Create karne ki basic testing
function createRoom() {
    let randomCode = Math.floor(1000 + Math.random() * 9000); // 4-digit code
    alert("QUAD CLASH Room Created!\nCode: " + randomCode + "\n\nWaiting for Multiplayer Server Connection...");
}

// Room Join karne ki basic testing
function joinRoom() {
    let code = document.getElementById("room-code-input").value;
    if(code.trim() === "") {
        alert("Please enter a valid 4-digit room code!");
        return;
    }
    alert("Attempting to join room: " + code);
}
