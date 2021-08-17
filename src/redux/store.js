import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import getApi from "../middleware/getApi";
import addApi from "../middleware/addApi";
import deleteApi from "../middleware/deleteApi";
import updateApi from "../middleware/updateApi";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getApi, addApi, deleteApi, updateApi),
});
