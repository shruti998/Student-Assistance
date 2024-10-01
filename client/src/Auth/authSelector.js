import { useDispatch } from "react-redux";
import { atom, selector } from "recoil";
import { setUsername } from "../Store/Actions/rommateAction";

export const authTokenState = atom({
  key: 'authTokenAtom',
  default: "",
});

export const authSelector = selector({
  key: 'authSelector',
  get: async ({get}) => {
    console.log("authentication");
    var token = get(authTokenState);
    if(!token || token === "") {
      return {status: false}
    }
    const result = await (fetch("http://localhost:3000/authToken/token/" + token).then(result => result.json()).catch(error => error));
    if(result && result.username) {
      return {status: true, username: result.username, type: result.type};
    }
    return {status: false};
  },
});