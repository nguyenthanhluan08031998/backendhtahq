
export const buildUserInfo = (data) => {
   return {
      type: "BUILD_USER_INFOMATION",
      user: data
   };
};

export const checkIsAuthenticated = () => ({
   type: "CHECK_IS_AUTHENTICATED"
});

export const logout = () => {
   return {
      type: "LOG_OUT"
   };
};