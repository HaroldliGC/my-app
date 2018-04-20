import {combineReducers} from 'redux';
import OperateReaderUser from '../pages/UserManagePage/reducers/index';
import OperateBook from '../pages/BookManagePage/reducers/index';
import OperateOrder from '../pages/BusinessPage/reducers/index';
import OperateLogin from '../pages/LoginPage/reducers/index';
import { reducer as formReducer} from 'redux-form';

const OperatorSets = combineReducers({
    OperateBook,
    OperateReaderUser,
    OperateOrder,
    OperateLogin,
    form: formReducer
});

export default OperatorSets;