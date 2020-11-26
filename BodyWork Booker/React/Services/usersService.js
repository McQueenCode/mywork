import axios from "axios";
import { onGlobalSuccess, onGlobalError, API_HOST_PREFIX } from "../services/serviceHelpers";

const endpoint = API_HOST_PREFIX + '/api/users';

const login = (payload) => {
  const config = {
    method: "POST",
    url: endpoint + "/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const register = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getCurrent = () => {
  const config = {
    method: "GET",
    url: endpoint + "/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const logout = () => {
  const config = {
    method: "GET",
    url: endpoint + "/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getUserById = (id) => {
  const config = {
    method: "GET",
    url: endpoint + `/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const confirmEmail = (token) => {
  const config = {
    method: "PUT",
    url: endpoint + `/confirmemail/${token}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllUsers = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllDetailedUsers = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paged/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getSearch = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getFilter = (pageIndex, pageSize, role) => {
  const config = {
    method: "GET",
    url: `${endpoint}/byrole/?pageIndex=${pageIndex}&pageSize=${pageSize}&role=${role}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};


const getByUserStatus = (pageIndex, pageSize, userStatusId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/userstatus/?pageIndex=${pageIndex}&pageSize=${pageSize}&userStatusId=${userStatusId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};


const updateUserStatus = (id, userStatusId) => {
  const config = {
    method: "PUT",
    url: endpoint + `/status/${id}/${userStatusId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const requestPwdReset = (email) => {
  const config = {
    method: "GET",
    url: endpoint + `/resetpwdrequest/${email}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const resetPwd = (payload, token) => {
  const config = {
    method: "PUT",
    url: endpoint + `/resetpwd/${token}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { login, register, getCurrent, getUserById, logout, confirmEmail, resetPwd, requestPwdReset, updateUserStatus, getAllDetailedUsers, getAllUsers, getSearch, getFilter, getByUserStatus };
