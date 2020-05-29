export const getServiceData = async (serviceID) =>
    await (await fetch(`/getServiceData/${serviceID}`)).json();
