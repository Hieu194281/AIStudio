import request from "@/utils/request";

export function getRole() {
  return request({
    method: "get",
    url: "/v1/user_role/list",
  });
}

export function addRole(newrole) {
  return request({
    url: "/v1/user_role/add",
    method: "post",
    data: newrole,
  });
}

export function updateRole(id, updateRole) {
  return request({
    url: `/v1/user_role/update/${id}`,
    method: "put",
    data: updateRole,
  });
}

export function deleteRole(id) {
  return request({
    url: `/v1/user_role/delete/${id}`,
    method: "delete",
  });
}
