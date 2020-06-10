export const getUserData = async (userID) => {
    try {
        const users = await fetch(`/getUserData/${userID}`);
        return await users.json();
    } catch (error) {
        console.log(error);
    }
};

export const updateTokensUsers = async (userID, token) => {
    try {
        const isUpdateOk = await fetch('/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, token }),
        });
        return await isUpdateOk.json();
    } catch (error) {
        console.log(error);
    }
};
