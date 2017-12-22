var roleMiner = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy < creep.carryCapacity) {
            creep.memory.miner = true;
        }
        else {
            creep.memory.miner = false;
        }
        if(creep.memory.miner){
        
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            creep.drop(RESOURCE_ENERGY);
        }
    }    
};

module.exports = roleMiner;
