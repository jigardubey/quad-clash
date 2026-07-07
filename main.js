let currentSelectedGame = "";
let gameInstance = null;

// Lobby kholne ke liye
function openLobby(gameId) {
    currentSelectedGame = gameId;
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("lobby-screen").classList.remove("hidden");
    
    let gameName = gameId === 'tank-game' ? 'TANK FIGHT' : 'CAR RACE';
    document.getElementById("selected-game-title").innerText = "LOBBY: " + gameName;
}

function backToMenu() {
    document.getElementById("main-menu").classList.remove("hidden");
    document.getElementById("lobby-screen").classList.add("hidden");
    if(gameInstance) {
        gameInstance.destroy(true);
        document.getElementById("game-container").innerHTML = "";
    }
}

function createRoom() {
    let randomCode = Math.floor(1000 + Math.random() * 9000);
    alert("Room Code: " + randomCode + "\n\nMultiplayer server abhi next step me connect hoga!");
}

function joinRoom() {
    let code = document.getElementById("room-code-input").value;
    if(code.trim() === "") {
        alert("Pehle 4-digit code daalo!");
        return;
    }
    alert("Joining Room: " + code);
}

// ------ TANK GAME CORE LOGIC ------
function startTankGame() {
    // Lobby chupao
    document.getElementById("lobby-screen").classList.add("hidden");
    
    // Phaser Game Config
    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'game-container',
        backgroundColor: '#1b1b22',
        physics: {
            default: 'arcade',
            arcade: { debug: false }
        },
        scene: { preload: preload, create: create, update: update }
    };

    gameInstance = new Phaser.Game(config);
}

function preload() {
    // Yahan hum bina graphics download kiye seedhe code se shapes banayenge (No asset loading needed)
}

function create() {
    // Ek temporary green box bana rahe hain jise hum screen par move karenge (Aapka Tank)
    this.tank = this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 40, 40, 0x00ffcc);
    this.physics.add.existing(this.tank);
    this.tank.body.setCollideWorldBounds(true);

    // Mobile touch controls ke liye text instructions
    this.add.text(20, 20, 'Tank Fight Screen Loaded!\nTap screen to move.', { fill: '#ffffff', fontSize: '18px' });

    // Screen par kahin bhi click karne par tank wahan move karega
    this.input.on('pointerdown', (pointer) => {
        this.physics.moveToObject(this.tank, pointer, 200);
    });
}

function update() {
    // Agar tank apni target jagah ke bohot paas pahunch jaye toh rok do
    let distance = Phaser.Math.Distance.Between(this.input.activePointer.x, this.input.activePointer.y, this.tank.x, this.tank.y);
    if (this.tank.body.speed > 0 && distance < 10) {
        this.tank.body.reset(this.tank.x, this.tank.y);
    }
}
