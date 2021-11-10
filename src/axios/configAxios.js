import axios from "axios";

const instance = axios.create({
  baseURL: "https://git.heroku.com/lsf-back.git/ api / ",
});
/*instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "token"
);*/

export default instance;
