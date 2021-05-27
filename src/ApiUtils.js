import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const API_URLS = {
  allData: `${BASE_URL}/get`,
  filterData: `${BASE_URL}/filter`
};

export const makeApi = (config, doCancelRequest) => {
  const { CancelToken } = axios;
  config.method = config.method || "GET";
  config.headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (doCancelRequest !== undefined) {
    config.cancelToken = new CancelToken(function executor(cancelHttpRequest) {
      doCancelRequest(cancelHttpRequest);
    });
  }
  return axios(config)
    .then(response => {
      return response;
    })
    .catch(response => {
      return response;
    });
};
