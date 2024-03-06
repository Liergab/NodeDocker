import discordModel from "../model/discordModel.js";


export const getDiscordUserById = async(req, res) => {
    const{id} =  req.params;

    try {
        const user = await discordModel.findById(id);
        if(!user){
            return res.status(404).json({error:"404 not found {id not found}"});
        }
        return res.status(200).json({discordUser: user})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal'})
    }

}