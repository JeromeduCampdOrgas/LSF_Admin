import axios from "axios";

const instance = axios.create({
  baseURL: "https://lsf-back.herokuapp.com/api/ ",
});
/*instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "token"
);*/

export default instance;
