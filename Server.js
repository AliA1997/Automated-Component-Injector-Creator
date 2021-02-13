class Server {
    constructor() {
        this.sourceDirectory = __dirname.replace('\\automation-apps\\component-injector-creator', '');
        console.log("_dirname", this.sourceDirectory);
    }
};

module.exports = { Server };