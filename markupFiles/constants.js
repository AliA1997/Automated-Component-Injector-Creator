const _ = require('lodash');
module.exports = {
    markup: nameOfComponent => `const LIST_ITEMS = '${_.camelCase(nameOfComponent)}/LIST_ITEMS';\nconst LIST_ITEMS_SUCCESS = '${_.camelCase(nameOfComponent)}/LIST_ITEMS_SUCCESS';\nconst LIST_ITEMS_FAIL = '${_.camelCase(nameOfComponent)}/LIST_ITEMS_FAIL';\n`
}
/*
const LIST_ITEMS = '${_.camelCase(nameOfComponent)}/LIST_ITEMS';\n
const LIST_ITEMS_SUCCESS = '${_.camelCase(nameOfComponent)}/LIST_ITEMS_SUCCESS';\n
const LIST_ITEMS_FAIL = '${_.camelCase(nameOfComponent)}/LIST_ITEMS_FAIL';\n
*/