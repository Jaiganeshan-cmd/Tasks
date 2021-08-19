import axios from "axios";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type === "updateApi") {
      const { url, method, headers, data, onSuccess } = action.payload;

      try {
        const response = await axios({
          url,
          method,
          headers,
          data,
          onSuccess,
        });
        console.log(response.data.results);
        dispatch({ type: onSuccess, payload: response.data.results });
      } catch (ex) {
        console.error(ex);
      }
    }

    next(action);
  };

export default api;
