
  /**
   * Set the authentication token in the localstorage
   * @param token Authentication token
   */
  export const setToken = (token) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", token);
  }

  /**
   * Gets refresh token from the local storage
   * @returns refresh token
   */
  export const getToken = () => {
    return localStorage.getItem("user");
  }

  /**
   * Removes token from local storage
   */
  export const removeToken = () => {
    localStorage.removeItem("user");
  }