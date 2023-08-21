import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage: storage,
  // tidak membawa state user untuk disimpan kedalam local storage
  // blacklist: ["user"],
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// middleware adalah library untuk helpers yang dijalankan sebelum menjalankan reducers
// filter berfungsi jika env di production maka tidak menjalankan logger malainkan [] kosong sebagai alternative luaran
const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  //   thunk,
  sagaMiddleware,
].filter(Boolean);

// kalo ga di tahap production maka mengizinkan extension redux devtools jika production maka tidak boleh menjalankan
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// compose untuk membaca functional dari kiri ke kanan
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// root reducers
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
