//configureStore = store의 역할
//한 애플리케이션당 하나의 스토어를 만든다.
//스토어에는 **앱 상태 + 리듀서 + 몇가지 내장함수가 포함**된다.

//combineReducers: sub리듀서를 하나로 합쳐줌,  / 
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { createWrapper} from 'next-redux-wrapper';

//history를 쌓아서 보기 위한 익스텐션을 사용하기 위함
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
//페이지공통
import navbarReducer from '../reducers/navbarReducer';
import noticeReducer from '../reducers/noticeReducer';
//홈화면
import yearlyCalendarReducer from '../reducers/yearlyCalendarReducer'
import tableReducer from "../reducers/tableReducer";
//상세화면
import programReducer from '../reducers/programReducer';
import timelineReducer from '../reducers/timelineReducer';
import timelineListReducer from "../reducers/timelineListReducer";
import faqReducer from '../reducers/faqReducer';
import reviewReducer from '../reducers/reviewReducer';

const configureStore = () => {
  const logger = createLogger();	
  const middlewares = [thunk, logger]; //thunk (비동기작업을 돕는 라이브러리)를 넣음
  
  //배포용과 개발용의 미들웨어 차이를 두기 위함
//  const enhancer = process.env.NODE_ENV === 'production'
//  ? compose(applyMiddleware([]))
//  : composeWithDevTools(applyMiddleware(...middlewares))//middlewares배열을 여기다가 넣음.
  
  const store = createStore(
    combineReducers({
      navbarReducer,
      noticeReducer,
      yearlyCalendarReducer,
      tableReducer,
      programReducer,
      timelineReducer,
      timelineListReducer,
      faqReducer,
      reviewReducer})
  //    , enhancer
      );
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
