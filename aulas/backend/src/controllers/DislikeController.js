const Dev = require('../models/Dev');//importando o model de devs

module.exports = {
    async store(req, res){//store equivale a criar um novo like no banco de dados

        const { user } = req.headers; 
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists'})
        }

       
        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json({ loggedDev });
    }
};