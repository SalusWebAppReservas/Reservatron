export const getUserData = async (userID) => await (await fetch(`/getUserData/${userID}`)).json();
