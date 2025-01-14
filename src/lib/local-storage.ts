const tokenName = "access-token";

export const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
};
