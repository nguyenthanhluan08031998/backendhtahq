import { getCookie, setCookie } from "@/app/utils/dataService"

const updateState = (oldState, updatedState) => {
   return {
      ...oldState, // overide the old statef
      ...updatedState, // update the new state
   };
};

const initialState = {
   theme: "light",
   user: {
      isAuthenticated: false,
      Id: 0,
      Name: "",
      Birthday: "",
      IdRole: "",
      Image: "",
      Email: "",
      NumberPhone: ""
   },
};
export function isNullOrEmpty(data) {
   if (data === null) {
      return true;
   }
   if (data === "") {
      return true;
   }
   if (data === undefined) {
      return true;
   }
   if (typeof data === "undefined") {
      return true;
   }
   return false;
}
const buildUserInfo = (state, action) => {
   let user = { ...state.user };
   if (!isNullOrEmpty(action.user)) {
      user.isAuthenticated = true;
      user.Id = action.user.Id;
      user.Name = action.user.Name;
      user.IdRole = action.user.IdRole;
      user.Image = action.user.Image;
      user.NumberPhone = action.user.NumberPhone;
      user.Email = action.user.Email;
   }

   return updateState(state, { user: user });
};

const resetUser = (state) => {
   let user = {
      isAuthenticated: false,
      Id: 0,
      Name: "",
      Birthday: "",
      IdRole: "",
      Image: "",
      Email: "",
      NumberPhone: ""
   };
   return updateState(state, { user: user });
};


const checkIsAuthenticated = (state) => {
   let { user } = state;
   if (!user.isAuthenticated) {
      var cookie = getCookie("myLogin")
      if (!isNullOrEmpty(cookie)) {
         let user = JSON.parse(cookie);
         return buildUserInfo(state, { user });
      }
   }
   return state;
};

const logout = (state) => {
   let cookies = "myLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   setCookie("myLogin", cookies, 0);
   return resetUser(state);
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "BUILD_USER_INFOMATION":
         return buildUserInfo(state, action);
      case "CHECK_IS_AUTHENTICATED":
         return checkIsAuthenticated(state);
      case "LOG_OUT":
         return logout(state);
      default:
         return state;
   }

};

export default reducer;
