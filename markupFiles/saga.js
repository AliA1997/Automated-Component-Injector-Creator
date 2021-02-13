const _ = require('lodash');
module.exports = {
    markup: nameOfComponent => `import { put, call, takeLatest, all } from 'redux-saga/effects';\nimport { getItems } from '../../services/getItems';\n\nimport * as constants from './constants';\nimport * as actions from './actions';\n\nexport default function* ${_.camelCase(nameOfComponent)}Saga() {\n\tyield all([\n\t\ttakeLatest(constants.LIST_ITEMS, listItemsSaga)\n\t]);\n}\n\nfunction* listItemsSaga({ options }) {\n\ttry {\n\t\tconst { items } = yield call(getItems, options);\n\t\tyield put(actions.listItemsSuccess(items));\n\t} catch(error) {\n\t\tyield put(actions.listItemsFail(error.message));\n\t}\n}\n\n`,
};
/*
    import { put, call, takeLatest, all } from 'redux-saga/effects';\n
    import { getItems } from '../../services/getItems';\n
    \n
    import * as constants from './constants';\n
    import * as actions from './actions';\n
    \n
    export default function* ${_.camelCase(nameOfComponent)}Saga() {\n
        \t yield all([\n
            \t\ttakeLatest(constants.LIST_ITEMS, \s listItemsSaga)\n
        \t ]);\n
    }\n

    function* listItemsSaga({ options }) {\n
        \t try { \n
        \t\t const { items } = yield call(getItems, options);\n
        \t\t yield put(actions.listItemsSuccess(items));\n
        \t} catch(error) {\n
        \t\t yield put(actions.listItemsFail(error.message));\n
        \t} 
    }\n
*/