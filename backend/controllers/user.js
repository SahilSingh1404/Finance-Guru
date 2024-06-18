import User from "../models/user.js"

export const delUrl=async (req, res) => {
    try {
        const {url} = req.body
        const {userId}=req.params
        const user=await User.findById(userId)
        const updatedFiles=user.files.filter((file)=>file.url!==url)
        user.files=updatedFiles

        const k=await user.save()

        if(!k)
            {
                res.status(502).json({message:"Can't save the user "})
            }
    
        return res.send({ message: 'file deleted from firebase storage' ,files:user.files});
    } catch (error) {
        console.error("Error while deleting the file:", error);
        return res.status(400).send(error.message);
    }
}

export const addUrl = async(req,res)=>{
    const {url,fileName} = req.body
    const userId = req.params.userId
    // console.log(userId,url)
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { files: {fileName:fileName,url:url} } },
            { new: true }
        );

        res.status(200).json({ message: 'file added successfully', user });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const addImg = async(req,res)=>{
    const {url} = req.body
    const userId = req.params.userId
    // console.log(userId,url)
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { image: url } },
            { new: true }
        );
        res.status(200).json({ message: 'image added successfully', user });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
