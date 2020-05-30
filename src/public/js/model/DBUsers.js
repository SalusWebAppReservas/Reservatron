export const getUserData = async (userID) => {
    try {
        const users = await fetch(`/getUserData/${userID}`);
        return await users.json();
    } catch (error) {
        console.log(error);
    }
};
