let serverUrl;

if (process.env.REACT_APP_LOCAL_HOST && process.env.REACT_APP_LOCAL_HOST == 'true'){
    serverUrl = 'localhost'
} else {
    serverUrl = '13.53.104.44'
}

export default serverUrl;