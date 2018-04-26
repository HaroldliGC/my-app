import {combineReducers} from 'redux';
import OperateReaderUser from '../pages/UserManagePage/reducers/index';
import OperateBook from '../pages/BookManagePage/reducers/index';
import OperateOrder from '../pages/BusinessPage/reducers/index';
import OperateLogin from '../pages/LoginPage/reducers/index';
import OperateAnalysis from '../pages/AnalysisPage/reducers/index';

const OperatorSets = combineReducers({
    OperateBook,
    OperateReaderUser,
    OperateOrder,
    OperateLogin,
    OperateAnalysis,
});

export default OperatorSets;