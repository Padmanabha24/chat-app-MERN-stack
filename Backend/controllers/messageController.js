import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage=async (req,res)=>{
try {
    const {message}=req.body;
    const {id:reciverId}=req.parms;
    const {senderId}=req._id.userId;

    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,reciverId]},

    })

    if(!conversation){
        let conversation=await Conversation.create({
            participants:{$all:[senderId,reciverId]},
    
        })
    }

    const newMessage=new Message({
        senderId,
        reciverId,
        message,

    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    res.status(201).json(newMessage);

} 
catch (error) {
    console.log("unable to send the message (controller)", err.message);
res.status(500).json({ error: "Internal Server Error" });
}
}