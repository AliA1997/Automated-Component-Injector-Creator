module.exports = {
    markup: nameOfComponent => `import * as constants from './constants';\nimport { fromJS, Map } from 'immutable';\n\nconst initialState = fromJS({\n\titemsById: {},\n\terror: null,\n\tloading: true,\n});\n\nexport default (state = initialState, action) => {\n\tswitch(action.type) {\n\t\tcase constants.LIST_ITEMS_SUCCESS:\n\t\t\treturn state\n\t\t\t\t.set(\n\t\t\t\t\t'itemsById',\n\t\t\t\t\t\taction.items.reduce(\n\t\t\t\t\t\t\t(itemsById, item) => itemsById.set(item.id, fromJS(item)),\n\t\t\t\t\t\t\tnew Map(),\n\t\t\t\t\t\t)\n\t\t\t\t\t);\n\t\tcase constants.LIST_ITEMS_FAIL:\n\t\t\treturn state.set('error', action.error).set('loading', false);\n\n\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n`
}
/*
import * as constants from './constants';\n
import { fromJS, Map } from 'immutable';\n

const initialState = fromJS({\n
    \titemsById: {},\n
    \terror: null,\n
    \tloading: true,\n
});\n

export default (state = initialState, action) => {\n
    \tswitch(action.type) {\n
        \t\tcase constants.LIST_ITEMS_SUCCESS:\n
        \t\t\treturn state\n
        \t\t\t\t.set(\n
        \t\t\t\t\t'itemsById',\n
        \t\t\t\t\t\taction.items.reduce(\n
        \t\t\t\t\t\t\t(itemsById, item) => itemsById.set(item.id, fromJS(item)),\n
        \t\t\t\t\t\t\tnew Map(),\n
        \t\t\t\t\t\t)\n
        \t\t\t\t\t)\n
        \t\tcase constants.LIST_ITEMS_FAIL:\n
        \t\t\treturn state.set('error', action.error).set('loading', false);\n
        \n
        \t\tdefault:\n
        \t\t\treturn state;\n
    \t}\n
}\n
*/