import User from "../model/user.model.js";

// create user
// read user
// read single user
// update user
// delete user

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
    console.log("user" , user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read User

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// single user

export const singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user

export const updateUser = async(req , res) => {
   try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete User

export const deleteUser = async(req , res) => {
  try{
    await User.findByIdAndDelete(req.params.id)
    res.json({message:"user delete successfully!"})
  }catch(err){
    res.status(400).json({error:err.message})
  }
}

