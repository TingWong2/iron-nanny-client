import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  withCredentials: true,
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

//! Error handling to use in the catch
function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  // Service is spread to have access to the basics get/post...
  ...service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUser(id) {
    return service
      .get("/api/users" + id)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(userInfo, id) {
    return service
      .patch("/api/users/" + id, userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn(token) {
    return service
      .get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  addMatched(id, userInfo) {
    return service
      .post("/api/matches/" + id, userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // Likes Persistency
  getLike(id) {
    return service.get("/api/matches/" + id);
  },

  getAllUsers() {
    return service
      .get("/api/users")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAvailabilities() {
    return service
      .get("/api/users/availabilities")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteUser(endpoint) {
    return service
      .delete(endpoint)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  findMatchList(endpoint) {
    return service
      .get(endpoint)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default apiHandler;
