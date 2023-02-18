
export const setSession = (sessionId) => {
  localStorage.setItem("sessionId", sessionId);
};

export const getSession = () => localStorage.getItem("sessionId");

export const clearSession = () => localStorage.removeItem("sessionId");