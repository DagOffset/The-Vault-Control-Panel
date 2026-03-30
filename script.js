const loginScreen = document.getElementById('login-screen');
const btnLogin = document.getElementById('btn-login');
const monitor = document.getElementById('main-monitor');
const log = document.getElementById('message-log');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const btnArresta = document.getElementById('btn-arresta');
const btnAttacco = document.getElementById('btn-attacco');

let logInterval;

const randomIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.0.${Math.floor(Math.random() * 100)}`;

// 1. LOGIN
btnLogin.addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user !== "" && pass !== "") {
        loginScreen.style.display = "none";
        monitor.classList.add('visible');
    }
});

// 2. MOTORE LOG
function startLogs() {
    if (logInterval) clearInterval(logInterval);
    logInterval = setInterval(() => {
        const normalPool = [
            `[OK] SYNCING WITH SWISS_SERVER_${randomIP()}`,
            `[INFO] ENCRYPTING ASSETS WITH AES-256`,
            `[OK] FIREWALL STABLE ON NODE_0x${Math.floor(Math.random()*1000).toString(16)}`,
            `[OK] DATABASE MIRRORING: ACTIVE`,
            `[INFO] AUTHENTICATING SESSION_${Math.floor(Math.random()*9999)}`,
            `[OK] PROXY TUNNEL ESTABLISHED: PORT 8080`
        ];
        const dangerPool = [
            `[ALERT] EXFILTRATION TO IP: ${randomIP()}`,
            `[ERR] BUFFER OVERFLOW AT 0x${Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase()}`,
            `[CRITICAL] UNAUTHORIZED ROOT ACCESS BY .teffsO.gaD`,
            `[ALERT] SQL INJECTION ON VAULT_DB`,
            `[CRITICAL] DATA_DUMP INITIATED: 45GB TRANSFERRED`
        ];

        const currentPool = monitor.classList.contains('danger') ? dangerPool : normalPool;
        const randomMsg = currentPool[Math.floor(Math.random() * currentPool.length)];
        
        log.innerHTML += `<br>> ${randomMsg}`;
        monitor.scrollTop = monitor.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

// 3. START CON CARICAMENTO
btnStart.addEventListener('click', () => {
    monitor.classList.remove('off', 'danger');
    btnStart.classList.add('hidden');
    log.innerHTML = "> [SYSTEM] INITIALIZING BOOT SEQUENCE...";
    
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 20);
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            finishBoot();
        }
        log.innerHTML = `> [SYSTEM] LOADING CORE MODULES: ${progress}%`;
    }, 300);
});

function finishBoot() {
    log.innerHTML = "> [SYSTEM] KERNEL LOADED. STATUS: SECURE.";
    btnReset.classList.remove('hidden');
    btnArresta.classList.remove('hidden');
    btnAttacco.classList.remove('hidden');
    startLogs();
}

// 4. ATTACCO
btnAttacco.addEventListener('click', () => {
    monitor.classList.add('danger');
    log.innerHTML += `<br><span style="color:white; background:red;">> [FATAL] SYSTEM BREACH IN PROGRESS...</span>`;
});

// 5. RESET
btnReset.addEventListener('click', () => {
    monitor.classList.remove('danger');
    log.innerHTML += `<br>> [SYSTEM] RECOVERING SECURITY LAYERS...`;
});

// 6. SHUTDOWN (PULITO)
btnArresta.addEventListener('click', () => {
    clearInterval(logInterval);
    monitor.classList.add('off');

    setTimeout(() => {
        log.innerHTML = "> [SYSTEM] STANDBY MODE... READY FOR BOOT.";
        btnReset.classList.add('hidden');
        btnArresta.classList.add('hidden');
        btnAttacco.classList.add('hidden');
        btnStart.classList.remove('hidden');
    }, 500);
});