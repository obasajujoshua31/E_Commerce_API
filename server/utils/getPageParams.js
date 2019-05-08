export default (request) => {
    const { page, limit, description_length } = request;
    const numberOfPage = parseInt(page, 10) || 1;
        const pageLimit = parseInt(limit, 10) || 20;
        const descriptionLength = parseInt(description_length, 10) || 200;

        return { numberOfPage, pageLimit, descriptionLength };
};


export const isValid = ( id ) => {
    let valid = false;
    const parsedId = parseInt(id, 10);
    !isNaN(parsedId) && (valid = true);
    return { valid, parsedId };
};
