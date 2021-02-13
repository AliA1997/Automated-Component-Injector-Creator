module.exports = {
    markup: nameOfComponent => `import * as constants from './constants';\n\nexport const listItems = (options) => ({\n\ttype: constants.LIST_ITEMS,\n\toptions,\n});\n\nexport const listItemsSuccess = (items) => ({\n\ttype: constants.LIST_ITEMS_SUCCESS,\n\titems,\n});\n\nexport const listItemsFail = (error) => ({\n\ttype: constants.LIST_ITEMS_FAIL,\n\terror,\n});\n`
};
/*
    import * as constants from './constants';\n
    \n
    export const listItems = (options) => ({\n
    \ttype: constants.LIST_ITEMS,\n
    \toptions,\n
    });\n
    \n
    export const listItemsSuccess = (items) => ({\n
    \ttype: constants.LIST_ITEMS_SUCCESS,\n
    \titems,\n
    });\n
    \n
    export const listItemsFail = (error) => ({\n
    \ttype: constants.LIST_ITEMS_FAIL,\n
    \terror,\n
    });\n
*/