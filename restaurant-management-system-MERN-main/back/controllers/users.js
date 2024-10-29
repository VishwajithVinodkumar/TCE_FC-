import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { Menu } from "../models/menu.js";


// all the funtion a;l the logic and called in routes. 

export const createUser = async (req, res, next) =>{
    try {
        const {name, username, password} = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({
                error: "Please provide all fields"
            })
        }

        const user = await User.create({name, username, password });
        res.status(201).json({
            message: "User created successfully",
            username
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Error creating user."
        });
    }
}

export const signUp = async (req, res, next) =>{
    try {
        const {name, username, password} = req.body;

        if (!name ||!username || !password) {
            return res.status(400).json({
                error: "Please provide all fields"
            })
        }
        const userinfo = await User.findOne({username});

        if (userinfo) {
            return res.status(400).json({
                error: "Username already exists please try logging in or use a different username!"
            });
        }

        // Here you can add logic to compare passwords, etc.

        const user = await User.create({name,username, password});

        
        res.status(201).json({
            message: "User created successfully",
            username
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Error finding user."
        });
    }
}



export const findUser = async (req, res, next) =>{
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Please provide username and password"
            })
        }
        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Here you can add logic to compare passwords, etc.

        res.status(200).json({
            message: "User found",
            user: user // You can send the user details here
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Error finding user."
        });
    }
}


export const validateUser = async (req, res, next) =>{
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Please provide username and password"
            })
        }
        const user = await User.findOne({username});
        // console.log(user)
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: "In correct password",
                user: user.username // You can send the user details here
            });
        }

        res.status(200).json({
            message: "User validated",
            user: {name : user.name, username:user.name, _id : user._id, role: user.role}   // You can send the user details here
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Error finding user in db."
        });
    }
}


export const getMenu = async (req, res, next) =>{
    try {

        const menu = await Menu.find({});

        console.log(menu);
        
        if (!menu) {
            return res.status(404).json({
                message: "No menu found!"
            });
        }

        res.status(200).json({
            message: "menu found sucessfully.",
            menu: menu
        });
    
    }
    catch (error) {
        res.status(500).json({
            error: "Error finding menu in db."
        });
    }
}


export const getOrders = async (req, res, next) =>{
    try {

        const {user_id} = req.body;
        console.log("ID: "+user_id)
        const orders = await Order.find({ordered_by: user_id });
        console.log(orders);
        
        if (!orders) {
            return res.status(404).json({ 
                message: "No order found!"
            });
        }

        res.status(200).json({
            message: "orders found sucessfully.",
            orders: orders
        });
    
    }
    catch (error) {
        res.status(500).json({
            error: "Error finding menu in db."
        });
    }
}


export const getMyOrders = async (req, res, next) =>{
    try {

        const {user_id} = req.body;

        const orders = await Order.find({ordered_by: user_id });

        console.log(orders);
        
        if (!orders) {
            return res.status(404).json({
                message: "No order found!"
            });
        }

        res.status(200).json({
            message: "orders found sucessfully.",
            orders: orders
        });
    
    }
    catch (error) {
        res.status(500).json({
            error: "Error finding menu in db."
        });
    }
}



// export const addCash = async (req, res, next) =>{
//     try {
//         const {username, cash} = req.body;

//         if (!username || !cash) {
//             return res.status(400).json({
//                 error: "Please provide all feilds"
//             })
//         }
   
//         const user = await User.findOne({username});
//         // console.log(user)
//         if (!user) {
//             return res.status(404).json({
//                 error: "User not found"
//             });
//         }

//         let added_cash = user.cashOwned + cash;

//         let change = await User.findByIdAndUpdate(user._id, { cashOwned: added_cash});
//         user.cashOwned = added_cash;
//         res.status(200).json({
//             message: "Cash Added Sucessfully!",
//             user: user // You can send the user details here
//         });
//     }
//     catch (error) {
//         res.status(500).json({
//             error: "Error finding user in db."
//         });
//     }
// }




// export const changePassword = async (req, res, next) =>{
//     try {
//         const {username, password, new_password} = req.body;

//         if (!username || !password || !new_password) {
//             return res.status(400).json({
//                 error: "Please provide username and password"
//             })
//         }
//         if (new_password == password) {
//             return res.status(400).json({
//                 message: "Old and new password should be different!"
//             })
//         }
//         const user = await User.findOne({username});
//         // console.log(user)
//         if (!user) {
//             return res.status(404).json({
//                 error: "User not found"
//             });
//         }

//         if (user.password !== password) {
//             return res.status(400).json({
//                 message: "In correct password",
//                 user: user.username // You can send the user details here
//             });
//         }

//         let change = await User.findByIdAndUpdate(user._id, { password: new_password });

//         res.status(200).json({
//             message: "Password Changed Sucessfully!",
//             user: user // You can send the user details here
//         });
//     }
//     catch (error) {
//         res.status(500).json({
//             error: "Error finding user in db."
//         });
//     }
// }

// export const createTrade = async (req, res, next) =>{
//     try {
//         const {
//                 title,
//                 description,
//                 postedBy,
//                 conditions,
//                 acceptedTrade
//         } = req.body;

//         // console.log(req.body);
    
//         const trade = await TradePost.create({
//             title,
//             description,
//             postedBy,
//             conditions,
//             acceptedTrade,
//             listOffers : []
//         }).catch(e => console.error(e));;
        
//         console.log("conditions: ");
        
//             if (!trade) {
//                 return res.status(404).json({
//                     error: "Error creating trade!"
//                 });
//             }
            
//             res.status(200).json({
//                 message: "Trade created sucessfully.",
//                 trade_info: trade
//             });
          
//         } 
//     catch (error) {
//         res.status(500).json({
//             error: "Error finding user in db."
//         });
//     }
// } 


// export const getTradesByUser = async (req, res, next) =>{
//     try {
//         const {username} = req.body;
//         // console.log(username)
//         if (!username) {
//             return res.status(400).json({
//                 error: "Please provide username"
//             })
//         }
//         const user = await User.findOne({username});

//         if (!user) {
//             return res.status(404).json({
//                 error: "User not found"
//             });
//         }

//         const trades = await TradePost.find({postedBy: username});
//         if (!trades) {
//             return res.status(404).json({
//                 message: "No trades found!"
//             });
//         }

//         trades.postedBy = user.username;

//         res.status(200).json({
//             message: "Trades found sucessfully.",
//             trades_info: trades
//         });
    
//     }
//     catch (error) {
//         res.status(500).json({
//             error: "Error finding user in db."
//         });
//     }
// }


// export const getAllTrades = async (req, res, next) =>{
//     try {

//         const trades = await TradePost.find({});
//         if (!trades) {
//             return res.status(404).json({
//                 message: "No trades found!"
//             });
//         }

//         res.status(200).json({
//             message: "Trades found sucessfully.",
//             trades_info: trades
//         });
    
//     }
//     catch (error) {
//         res.status(500).json({
//             error: "Error finding user in db."
//         });
//     }
// }
