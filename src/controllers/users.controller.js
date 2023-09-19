import { usersService } from "../services/index.js"
import { createHash } from "../utils/index.js";

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

/**
 * The function `getUser` retrieves a user by their ID and sends a response with the user's information
 * if found, or an error message if not found.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. It is typically
 * provided by the web framework or server that handles the HTTP request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 * @returns a user object if it exists, along with a status of "success". If the user does not exist,
 * it returns a status of "error" and an error message stating "User not found".
 */
const getUser = async(req,res)=> {
    const userId = req.params.uid;
    // console.log(userId)
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    // console.log(user)
    res.send({status:"success",payload:user})
}

const createUser = async (req,res)=>{
    const { first_name, last_name, password, email } = req.body
    const newUser = {
        first_name: first_name,
        last_name: last_name,
        password: await createHash(password),
        email: email
    }
    const result = await usersService.create(newUser);
    res.send({status:"success",message:"User created"})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    console.log(result)
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUser
}