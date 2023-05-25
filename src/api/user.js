import request from "@/utils/request";

export function getUser() {
  return request({
    method: "get",
    url: "/v1/user/list",
  });
}
export function getInfoUser(id) {
  return request({
    url: `/v1/user/list/${id}`,
    method: "get",
  });
}

export function addUser(newUser) {
  return request({
    url: "/v1/user/add",
    method: "post",
    data: newUser,
  });
}

export function updateUser(id, updateUser) {
  return request({
    url: `/v1/user/update/${id}`,
    method: "put",
    data: updateUser,
  });
}

export function deleteUser(id) {
  return request({
    url: `/v1/user/delete/${id}`,
    method: "delete",
  });
}

export function ChangePassword(data) {
  return request({
    url: "v1/user/change_password",
    method: "put",
    params: data,
  });
}
