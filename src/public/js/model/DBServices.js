export const getServiceData = async (serviceID) => {
    try {
        return await (await fetch(`/getServiceData/${serviceID}`)).json();
    } catch (error) {
        console.log(error);
    }
};
