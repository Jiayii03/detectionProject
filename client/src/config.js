let serverUrl;

if (process.env.REACT_APP_LOCAL_HOST && process.env.REACT_APP_LOCAL_HOST == 'true'){
    serverUrl = 'localhost'
} else {
    serverUrl = 'https://platerecognizer-server.onrender.com/'
}

export default serverUrl;