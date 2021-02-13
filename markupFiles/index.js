module.exports = {
    markup: (nameOfComponent) => `import React from 'react';\nimport { connect } from 'react-redux';\nimport { createStructuredSelector } from 'reselect';\nimport { compose } from 'recompose';\nimport reducer from './reducer';\nimport saga from './saga';\nimport * as actions from './actions';\nimport * as selectors from './selectors';\nconst ${nameOfComponent} = ({ \n\tdispatch,\n }) => {\n\treturn (\n\t\t<div>${nameOfComponent}</div>\n\t);\n}\n\nconst mapStateToProps = createStructuredSelector({\n\titems: selectors.itemsSelector,\n\tloading: selectors.loadingSelector,\n\terror: selectors.errorSelector,\n});\n\nconst withConnect = connect(mapStateToProps);\nexport default compose(withConnect)(${nameOfComponent});`
}
/*
import React from 'react';\n
import { connect } from 'react-redux';\n
import { createStructuredSelector } from 'reselect';\n 
import { compose } from 'recompose';\n
import reducer from './reducer';\n
import saga from './saga';\n
import * as actions from './actions';\n
import * as selectors from './selectors';\n
const ${nameOfComponent} = ({
    dispatch,\n
}) => {\n
    return (\n
        <div>${nameOfComponent}</div>\n
    );\n
}\n
\n
const mapStateToProps = createStructuredSelector({\n
    \titems: selectors.itemsSelector,\n
    \tloading: selectors.loadingSelector,\n
    \terror: selectors.errorSelector,\n
});\n
\n
const withConnect = connect(mapStateToProps);\n
export default compose(withConnect)(${nameOfComponent});
*/