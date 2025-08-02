import asyncHandler from "express-async-handler"
import User from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express"
import Notification from "../models/notification.model.js";

export const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" })

    res.status(200).json({ user })
})


export const updateProfile = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const user = await User.findByIdAndUpdate({ clerkId: userId }, req.body, { new: true });

    if (!user) return res.status(404).json({ error: "User not found" })

    res.status(200).json({ user })
})


export const syncUser = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const existingUser = await User.findOne({ clerkId: userId })
    if (existingUser) return res.status(200).json({ error: "User already exist" })

    //create new user from clerk data

    const clerkuser = await clerkClient.users.getUser(userId);

    const userData = {
        clerkId:userId,
        email:clerkuser.emailAddresses[0].emailAddress,
        firstName:clerkuser.firstName || "",
        lastName:clerkuser.lastName || "",
        username:clerkuser.emailAddresses[0].emailAddress.split("@")[0],
        profilePicture:clerkuser.imageUrl || "",
    };

    const user = await User.create(userData);

    res.status(200).json({ user ,message:"User Created Successfully" })
})


export const getCurrentuser = asyncHandler(async(req,res)=>{
    const {userId} = getAuth(req);


     const user = await User.findOne({ clerkId:userId });

    if (!user) return res.status(404).json({ error: "User not found" })

    res.status(200).json({ user })

})

export const followUser = asyncHandler(async(req,res)=>{
    const {userId}  = getAuth(req);

    const {targetUserId} = req.params;

    if(userId === targetUserId) return res.status(400).json({error:"You cannot follow yourself"});

    const currentUser = await User.findOne({clerkId:userId});
    const targetuser = await User.findOne(targetUserId);

     if (!currentUser || !targetuser) return res.status(404).json({ error: "User not found" })

    const isFollowing = currentUser.following.includes(targetUserId);

    if(isFollowing){
        //unfollow
        await User.findByIdAndUpdate(currentUser._id ,{
            $pull:{following:targetUserId}
        })

        await User.findByIdAndUpdate(targetUserId ,{
            $pull:{followers:currentUser.id}
        })
    }else{
           await User.findByIdAndUpdate(currentUser._id ,{
            $push:{following:targetUserId}
        })

        await User.findByIdAndUpdate(targetUserId ,{
            $push:{followers:currentUser.id}
        })
    }

    await Notification.create({
        form:currentUser._id,
        to:targetUserId,
        type:"follow"
    })


     res.status(200).json({ message:isFollowing ?"User Unfollow Successfully" : "User Followed Successfully" })
    
});
