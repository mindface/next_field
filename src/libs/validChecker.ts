
export const invalidCheckEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@{1}([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
