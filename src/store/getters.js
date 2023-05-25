const getters = {
  id: (state) => state.user.id,
  token: (state) => state.user.token,
  changePassword: (state) => state.user.changePassword,
  email: (state) => state.user.email,
  firstName: (state) => state.user.firstName,
  lastName: (state) => state.user.lastName,
  address: (state) => state.user.address,
  dateofBirth: (state) => state.user.dateofBirth,
};
export default getters;
