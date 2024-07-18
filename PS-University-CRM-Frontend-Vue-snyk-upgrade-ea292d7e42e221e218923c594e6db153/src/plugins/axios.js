import axios from "axios";

export default {
  install: (app, options) => {
    app.config.globalProperties.$axios = axios.create({
      baseURL: options.baseUrl,
      headers: {
        Authorization: options.token ? `Bearer ${options.token}` : "",
        // "Access-Control-Allow-Origin": "*",
        common: {
          //   "Access-Control-Allow-Origin": "*",
        },
      },
    });
  },
};
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
