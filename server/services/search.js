const Vote = require('../models/Vote');
const Group = require('../models/Group');

exports.search = async q => {
    const { query, section } = q;
    
    if(query && !section){
        const votes = await findVotes(query);
        const groups = await findGroups(query);
        return { votes, groups };
    }
    if(query && section) {
        if(section === 'vote'){
            return await findVotes(query);
        }
        if(section === 'group'){
            return await findGroups(query);
        }
    }
}

const findVotes = async query => {
    const votes = 
        await Vote.find({ title: { $regex: query } })
            .populate('organizer', 'name image')
            .populate('group', 'name image');
    return votes;
}

const findGroups = async query => {
    const groups = 
        await Group.find({ name: { $regex: query } });
    return groups;
}