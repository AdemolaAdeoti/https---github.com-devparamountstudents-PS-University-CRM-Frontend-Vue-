import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
// import { memoizedRefreshToken } from "../utilities/refreshToken";

import { showModal } from "@/plugins/modal";
//const user = localStorage.getItem("user");
window.modalOpened = false;
const HTTP = axios.create({  
  headers: {
    "Content-Type": "application/json",
  },
});

const HTTPFORMDATA = axios.create({  
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

/* function requestLogout() {
  if (!window.modalOpened) {
    showModal({
      text: "Network Error: Probably session expired. Logout?",
      confirmText: "Login",
      cancelText: "Cancel",
    }).then((result) => {
      window.modalOpened = false;      
      if (result) {
        const store = useAuthStore();
        store.logout();
      } 
    });
  }
} */
function sessionExpired() {
  if (!window.modalOpened) {
    showModal({
      text: "Session expired!",
      confirmText: "Login",
      cancelText: "Cancel",
    }).then(function () {
      window.modalOpened = false;
      const store = useAuthStore();
      store.logout();
    });
  }
}

async function displayOk(text) {
  if (!window.modalOpened) {
    await showModal({
      text: text,
      confirmText: "Ok",
      cancelText: "Cancel",
    });
    window.modalOpened = false;
  }
}

export const get = async (resource, prefix = true, idempotency = "") => {
  const token = localStorage.getItem("user");
  const store = useUserStore();
  if (prefix) {
    resource = "university/" + resource;
  }
  store.isLoading = true;
  try {
    const response = await HTTP.get(window.baseUrl+resource, {
      headers: {
        idempotency: idempotency,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    store.isLoading = false;
    let obj = typeof response.data === "object" ? response.data : {};
    if (Object.keys(obj)?.includes("data")) {
      return response.data.data.responseBody; //for now
    } else if (Object.keys(obj)?.includes("status") === "success") {
      return response.data;
    } else {
      return response.data;
      //throw new Error(response?.data.message ?? "Something went wrong!");
    }
  } catch (e) {
    store.isLoading = false;

    if (e?.message === "Network Error") {
      displayOk("Network Error");
    } else if (e.response.status === 401 || e.response.status === 302) {
      sessionExpired();      
    } else {
      const message = [
        typeof e.response?.data == "object" ? "" : e.response?.data,
        e.response?.data?.message,
        e.response?.data?.responseBody,
      ];
      displayOk(message.join("@").replaceAll("@", " "));
    }

    return false;
  }
};

export const post = async (resource, data, prefix = true, idempotency = "") => {
  const token = localStorage.getItem("user");
  if (prefix) {
    resource = "university/" + resource;
  }

  const store = useUserStore();
  store.isLoading = true;
  try {
    const response = await HTTP.post(window.baseUrl+resource, data, {
      headers: {
        idempotency: idempotency,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    store.isLoading = false;
    let obj = typeof response.data === "object" ? response.data : {};
    if (Object.keys(obj)?.includes("data")) {
      return response.data.data.responseBody; //for now
    } else if (Object.keys(obj)?.includes("status") === "success") {
      return response.data;
    } else {
      return response.data;
      //throw new Error(response?.data.message ?? "Something went wrong!");
    }
  } catch (e) {
    store.isLoading = false;
    if (e?.message === "Network Error") {
      displayOk("Network Error");      
    } else  if (e.response.status === 401 || e.response.status === 302) {
      const currentUrl = window.location.href;
      if (currentUrl.includes("login")) {
        displayOk("Invalid credentials");
      } else {
        sessionExpired();
      }      
    } else {
      const message = [
        typeof e.response?.data == "object" ? "" : e.response?.data,
        e.response?.data?.message,
        e.response?.data?.responseBody,
      ];
      displayOk(message.join("@").replaceAll("@", " "));
    }
    

    return false;
  }
};
export const postFormData = async (
  resource,
  data,
  prefix = true,
 // idempotency = ""
) => {
  const token = localStorage.getItem("userToken");
  if (prefix) {
    resource = "university/" + resource;
  }

  const store = useUserStore();
  store.isLoading = true;
  try {
    const response = await HTTPFORMDATA.post(window.baseUrl+resource, data, {
      headers: {
        //idempotency: idempotency,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    store.isLoading = false;
    let obj = typeof response.data === "object" ? response.data : {};
    if (Object.keys(obj)?.includes("data")) {
      return response.data.data.responseBody; //for now
    } else if (Object.keys(obj)?.includes("status") === "success") {
      return response.data;
    } else {
      return response.data;
      //throw new Error(response?.data.message ?? "Something went wrong!");
    }
  } catch (e) {
    store.isLoading = false;
    if (e?.message === "Network Error") {
      displayOk("Network Error");
    } else if (e.response.status === 401 || e.response.status === 302) {
      sessionExpired();      
    } else {
      const message = [
        typeof e.response?.data == "object" ? "" : e.response?.data,
        e.response?.data?.message,
        e.response?.data?.responseBody,
      ];
      displayOk(message.join("@").replaceAll("@", " "));
    }

    return false;
  }
};
