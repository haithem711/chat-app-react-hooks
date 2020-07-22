const mongoose = require("mongoose");
const router = require("./auth");
const Chatroom = mongoose.model("Chatroom");
const requirelogin=require('./middlware/requirelogin')
router.post("/create", requirelogin,async (req, res)=>{
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";
  
    const chatroomExists = await Chatroom.findOne({ name });
  
    if (chatroomExists) throw "Chatroom with that name already exists!";
  
    const chatroom = new Chatroom({
      name,
    });
  
    await chatroom.save();
  
    res.json({
      message: "Chatroom created!",
    });
})
router.get("/getall", requirelogin, async (req, res)=>{
    const chatrooms = await Chatroom.find({});

  res.json(chatrooms);

});
module.exports=router