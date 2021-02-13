const fs = require('fs'),
      path = require('path'),
      { prompt, Select } = require('enquirer'),
      _ = require('lodash'),
      indexMarkupFile = require('./markupFiles/index'),
      constantsMarkupFile = require('./markupFiles/constants'),
      reducerMarkupFile = require('./markupFiles/reducer'),
      actionsMarkupFile = require('./markupFiles/actions'),
      selectorsMarkupFile = require('./markupFiles/selectors'),
      sagaMarkupFile = require('./markupFiles/saga'),
      { Server } = require('./Server');
    
const server = new Server();

setTimeout(async function() {
    await runServer(server);
}, 1000)

class Question {
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
};

Question.prototype.return = function() {
    return {
        type: 'input',
        name: this.name,
        message: this.message,
    };
}

Server.prototype.askQuestion = async function (nameArg, questionArg) {
    const question = new Question(nameArg, questionArg);
    return getAnswerFromQuestion( await prompt(question.return()) );
}

Server.prototype.createComponent = async function() {
    let presentationalComponentAnswers = ['P', 'PRESENTATION', 'PRESENTATIONAL', '[P]RESENTATIONAL'],
        containerComponentAnswers = ['C', 'CONTAINER', '[C]ONTAINER]'],
        componentTypeAnswer = await this.askQuestion('componentType', 'What is the type of component is it [C]ontainer] or [P]resentational?');
    
    componentTypeAnswer = componentTypeAnswer.toUpperCase();
    
    if(presentationalComponentAnswers.includes(componentTypeAnswer)) this.sourceDirectory = this.sourceDirectory + '\\src\\components';
    
    if(containerComponentAnswers.includes(componentTypeAnswer)) this.sourceDirectory = this.sourceDirectory + '\\src\\containers';

    if(!checkIfDirectoryExists(server.sourceDirectory)) fs.mkdirSync(server.sourceDirectory, { recursive: true });
    
    const componentNameAnswer = await this.askQuestion('componentName', 'What is the name of the component?');
    this.sourceDirectory = componentNameAnswer[0] === '/' ? this.sourceDirectory + componentNameAnswer :  `${this.sourceDirectory}\\${componentNameAnswer}`;
    console.log("This.sourceDirectory before doesComponentExist boolean check:", this.sourceDirectory)

    if(!checkIfDirectoryExists(server.sourceDirectory)) fs.mkdirSync(this.sourceDirectory, { recursive: true });
    this.generateIndexJsMarkup(componentNameAnswer);
    this.generateConstantJsMarkup(componentNameAnswer);
    this.generateReducerJsMarkup();
    this.generateActionsJsMarkup();
    this.generateSelectorJsMarkup(componentNameAnswer);
    this.generateSagaJsMarkup(componentNameAnswer);
    return await this.askQuestion('continue', 'Would you like to create another component, [Y]es or [N]o?');
}


async function runServer(server) {
    let done = false;
    const answer = await server.askQuestion(
                        'doCreateApp', 
                        `Welcome! \n 
                        This application is responsible for creating markup for react components. \n 
                        It will create a new directory for a component, and create a styles.scss, index.js, reducer.js, selectors.js, constants.js, actions.js and saga.js. \n 
                        Would you like to proceed, [Y]es or [N]o?`
                    );
    if(checkIfAnswerIsYesOrNo( answer )) {
        var directoryAnswer = await server.askQuestion('directoryQuestion', 'What is the source directory of the project? (note I am assuming your project is in the projects directory.)'); 
        if(directoryAnswer[0] != '/') directoryAnswer = `\\${directoryAnswer}`;
        console.log("server.sourceDirectory", server.sourceDirectory);
        server.sourceDirectory = server.sourceDirectory + directoryAnswer;
        if(!checkIfDirectoryExists(server.sourceDirectory)) fs.mkdirSync(server.sourceDirectory, { recursive: true });
        while(!done) {
            result = await server.createComponent();
            if(checkIfAnswerIsYesOrNo( result )) continue;
            done = true;
        }
    }
    console.info("See you the next time you want to create a component!");
}

function getAnswerFromQuestion(result) {
    const answerKey = Object.keys(result)[0];
    return result[answerKey];
}

function checkIfAnswerIsYesOrNo(answer) {
    const possibleAnswers = ['Y', 'YES', 'YEA', 'YEAH', '[Y]ES'];
    console.log("answer:", answer);
    answer = answer.toUpperCase();
    if(possibleAnswers.includes(answer)) return true;
    return false;
}

function checkIfDirectoryExists(directory) {
    var doesDirectoryExist = true;
    try {
        fs.readdirSync(server.sourceDirectory);
    } catch(error) {
        doesDirectoryExist = false;
        console.log("FUCK!!");
    } finally {
        console.log("FINALLY FUCK!!");
        return doesDirectoryExist;
    }
}

Server.prototype.generateIndexJsMarkup = function(nameOfComponent) {
    this.sourceDirectory = this.sourceDirectory + '\\index.js';
    
    fs.writeFileSync(this.sourceDirectory, indexMarkupFile.markup(nameOfComponent));
}

Server.prototype.generateConstantJsMarkup = function(nameOfComponent) {
    this.sourceDirectory = this.sourceDirectory.replace('\\index.js', '\\constants.js');

    fs.writeFileSync(this.sourceDirectory, constantsMarkupFile.markup(nameOfComponent));
}

Server.prototype.generateReducerJsMarkup = function() {
    this.sourceDirectory = this.sourceDirectory.replace('\\constants.js', '\\reducer.js');

    fs.writeFileSync(this.sourceDirectory, reducerMarkupFile.markup());
}

Server.prototype.generateActionsJsMarkup = function() {
    this.sourceDirectory = this.sourceDirectory.replace('\\reducer.js', '\\actions.js');

    fs.writeFileSync(this.sourceDirectory, actionsMarkupFile.markup());
}

Server.prototype.generateSelectorJsMarkup = function(nameOfComponent) {
    this.sourceDirectory = this.sourceDirectory.replace('\\actions.js', '\\selectors.js');

    fs.writeFileSync(this.sourceDirectory, selectorsMarkupFile.markup(nameOfComponent));
}

Server.prototype.generateSagaJsMarkup = function(nameOfComponent) {
    this.sourceDirectory = this.sourceDirectory.replace('\\selectors.js', '\\saga.js');

    fs.writeFileSync(this.sourceDirectory, sagaMarkupFile.markup(nameOfComponent));
}
