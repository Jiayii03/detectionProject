let serverUrl;
let serverPort;

if (process.env.REACT_APP_LOCAL_HOST && process.env.REACT_APP_LOCAL_HOST == 'true'){
    serverUrl = 'http://localhost'
    serverPort = ':3001'
} else {
    serverUrl = 'https://platerecognizer-server.onrender.com'
    serverPort = ''
}

export { serverUrl, serverPort };