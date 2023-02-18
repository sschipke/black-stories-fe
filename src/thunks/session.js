import { getSession, clearSession } from "../util/session";
import { setPassword, setHaveCheckedForSession } from "../actions";
import { authenticateSession } from "../util/apiCalls";

export const handleSessionLoad = () => (dispatch) => {
  const sessionId = getSession();
  console.log("Checking for Session! ", { sessionId });
  if (sessionId) {
    authenticateSession(sessionId)
      .then(() => {
        dispatch(setPassword(sessionId));
        dispatch(setHaveCheckedForSession(true));
      })
      .catch((err) => {
        const { error } = err;
        if (error === "Unauthorized") {
          clearSession();
        }
        console.error("Error validating session. ", err);
        dispatch(setHaveCheckedForSession(true));
      });
  }
  dispatch(setHaveCheckedForSession(true));
};
