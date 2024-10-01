import { response } from 'express';
import User from './../services/user.js';
import UserModel from './../models/user.js';
import Admin from './../services/admin.js'
import AdminModel from './../models/admin.js'
import AuthToken from '../services/authToken.js';


// Error Handling 
const errorHandler = (response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}

// API Request : To get data from DB for scpecific ID
const get = (request, response) => {
    const id = request.params.id;
    Admin.get(id)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

// API Request : To Save data in DB
const create = (request, response) => {
    const newUser = Object.assign({}, request.body);
    Admin.create(newUser)
        .then((user) => {
            response.status(200);
            response.json(user);
        })
        .catch(errorHandler(response));
};

// API Request : To get all data from DB
const index = (request, response) => {
    Admin.search({})
        .then((user) => {
            response.status(200);
            response.json(user);
        })
        .catch(errorHandler(response));
};


// API Request : To Update an exisitng ID in DB
const update = (request, response) => {
    const id = request.params.id;
    const updateUser = Object.assign({}, request.body);
    Admin.update(id, updateUser)
        .then((user) => {
            response.status(200);
            response.json(user);
        })
        .catch(errorHandler(response));
};



// API Request : To Remove an exisitng ID from DB
const remove = (request, response) => {
    const id = request.params.id;
    Admin.remove(id)
        .then((user) => {
            response.status(200);
            response.json({
                message: `User ${id} deleted successfully!`
            });
        })
        .catch(errorHandler(response));
};

const login=async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        const userValid = await AdminModel.findOne({email:email});
        console.log("userValid.password1",userValid.password)
         if(userValid){

             //const isMatch = await bcrypt.compare(password,userValid.password);
             //const isMatch = password,userValid.password);
 console.log("userValid.password",userValid.password)
             if(password!=userValid.password){
                 res.status(422).json({ error: "invalid details"})
             }else{

                 // token generate
                 //const token = await userValid.generateAuthtoken();

                 // cookiegenerate
                //  res.cookie("usercookie",token,{
                //      expires:new Date(Date.now()+9000000),
                //      httpOnly:true
                //  });

                //  const result = {
                //      userValid,
                //      token
                //  }
                console.log("hi "+email)
                //  res.status(201).json({status:201,result})
                
                // create a new token here
                var authToken = await AuthToken.create({username: userValid.userName, type: "admin"});
                res.status(201).json({status:201, authToken: authToken});
             }
         }else{
             res.status(401).json({status:401,message:"invalid details"});
         }

     }catch (error) {
         res.status(401).json({status:401,error});
         console.log("catch block");
     }
}


export default {
    create: create,
    index: index,
    get: get,
    update: update,
    remove: remove,
    login:login

   // updatePassword:updatePassword
}