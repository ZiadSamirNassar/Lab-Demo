
const isValid = async (schema) => {

    return async (req, res, next) => {
        //validate the request body with zod schema
        await schema.parseAsync(req.body);
        //if the request body is not valid, zod will throw an error and we will catch it in the next global error middleware
        
        //if the request body is valid, we will call the next middleware
        next();
    }
    
}

export { isValid }
