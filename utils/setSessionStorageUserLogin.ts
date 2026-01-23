export const SetSessionStorageUserLogin = (normalizeEmail: string) => {
  return sessionStorage.setItem(
    "post_set_password",
    JSON.stringify({
      email: normalizeEmail,
      at: Date.now(),
    })
  );
};
