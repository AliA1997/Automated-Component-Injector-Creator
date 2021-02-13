const _  = require('lodash');
module.exports = {
    markup: nameOfComponent => `import { createSelector } from 'reselect';\nimport { initialState } from './reducer';\n\nexport const ${_.camelCase(nameOfComponent)}Selector = state => state.get('${_.camelCase(nameOfComponent)}') || initialState;\n\nexport const getItemsById = createSelector(\n\t ${_.camelCase(nameOfComponent)}Selector,\n\tstate => state.get('itemsById'),\n);\n\nexport const itemsSelector = createSelector(\n\t[getItemsById],\n\titems => \n\t\titems \n\t\t\t.valueSeq()\n\t\t\t.map(itm => itm.toJS())\n\t\t\t.toArray()\n);\n\nexport const loadingSelector = createSelector(\n\t${_.camelCase(nameOfComponent)}Selector,\n\t state => state.get('loading'),\n);\n\nexport const errorSelector = createSelector(\n\t${_.camelCase(nameOfComponent)}Selector,\n\t state => state.get('error'),\n);\n\n`,
};
/*
    import { createSelector } from 'reselect';\n
    import { initialState } from './reducer';\n
    \n
    export const ${_.camelCase(nameOfComponent)}Selector = state => state.get('${_.camelCase(nameOfComponent)}') || initialState;\n
    \n
    export const getItemsById = createSelector(\n
    \t ${_.camelCase(nameOfComponent)}Selector,\n 
    \t state => state.get('itemsById'),\n
    );\n
    \n
    export const itemsSelector = createSelector(\n
    \t [getItemsById],\n
    \t items => \n
    \t\t items \n
    \t\t\t .valueSeq()\n
    \t\t\t .map(itm => itm.toJS()) \n
    \t\t\t .toArray()\n
    );\n
    \n

    export const loadingSelector = createSelector(\n
        \t ${_.camelCase(nameOfComponent)}Selector,\n 
        \t state => state.get('loading'),\n
    );\n
    \n

    export const errorSelector = createSelector(\n
        \t ${_.camelCase(nameOfComponent)}Selector,\n
        \t state => state.get('error'),\n
    );\n
    \n
*/