const stories = require('./src/stories');
const chats = require('./src/get_chat');
const remove_follows = require('./src/remove_follows')
const { session_id } = require('./settings.json')
const username = '_opxl.x_s'
const readline = require('readline');


const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readInterface.question('Provide your username : ', result => {
    if (result) {
        readInterface.question('Provide your mode \n 1.Chat \n 2.Stories \n Answer : ', results => {
            if (results == "1" || result.toLowerCase() == 'chat') {
                chats(result, session_id);
            } else if (results == "2" || results.toLowerCase() == "stories") {
                stories(result,session_id).then(console.log);
            } else if (results == "3") {
                remove_follows(result,session_id).then(console.log)
            };
            return readInterface.close();
        });
    };
});