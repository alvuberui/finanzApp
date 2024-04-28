/**
 * Get de user id from the token
 * @param request 
 * @returns user id 
 */
export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message) 
    }
}