import {combineReducers} from 'redux';
import OperateReaderUser from '../pages/UserManagePage/reducers/index';
import OperateBook from '../pages/BookManagePage/reducers/index';
import OperateOrder from '../pages/BusinessPage/reducers/index'

const OperatorSets = combineReducers({
    OperateBook,
    OperateReaderUser,
    OperateOrder
});

export default OperatorSets;