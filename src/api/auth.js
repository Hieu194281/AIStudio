import request from "@/utils/request";

export function login(data) {
  return request({
    method: "post",
    url: "/v1/authorization/login",
    params: data,
  });
}

export function logout() {
  return request({
    method: "post",
    url: "/v1/authorization/logout",
  });
}
