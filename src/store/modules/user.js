import { login, logout } from "@/api/auth";
import {
  getToken,
  setToken,
  removeToken,
  setID,
  getID,
  getChangepassword,
  setChangepassword,
} from "@/utils/auth";
import { getInfoUser } from "@/api/user";

const state = {
  token: getToken(),
  id: getID(),
  changePassword: getChangepassword(),
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  dateofBirth: "",
};
const getters = {};
const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((respone) => {
          if (respone.status === 200) {
            const { data } = respone;
            commit("SET_TOKEN", data.jwt);
            setToken(data.jwt);
            commit("SET_ID", data.id);
            setID(data.id);
            commit("SET_CHANGEPASSWORD", data.changedPassword);
            setChangepassword(data.changedPassword);
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      getInfoUser(id)
        .then((respone) => {
          if (respone.status === 200) {
            const { data } = respone;
            commit("SET_EMAIL", data.data.userEmail);
            commit("SET_FIRSTNAME", data.data.userFirstName);
            commit("SET_LASTNAME", data.data.userLastName);
            commit("SET_ADDRESS", data.data.userAddress);
            commit("SET_DATEOFBIRTH", data.data.userDateOfBirth);
            resolve();
          }
        })
        .catch((e) => reject(e));
    });
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        commit("SET_ID", "");
        commit("SET_TOKEN", "");
        commit("SET_EMAIL", "");
        commit("SET_FIRSTNAME", "");
        commit("SET_LASTNAME", "");
        commit("SET_ADDRESS", "");
        commit("SET_DATEOFBIRTH", "");
        setToken("");
        setID("");
        setChangepassword(false);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
};
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_ID(state, id) {
    state.id = id;
  },
  SET_FIRSTNAME(state, firstName) {
    state.firstName = firstName;
  },
  SET_LASTNAME(state, lastName) {
    state.lastName = lastName;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  },
  SET_DATEOFBIRTH(state, dateofBirth) {
    state.dateofBirth = dateofBirth;
  },
  SET_CHANGEPASSWORD(state, status) {
    state.changePassword = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
