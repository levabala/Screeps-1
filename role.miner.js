var roleMiner = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy < creep.carryCapacity) {
            creep.memory.repairer = true;
        }
        else {
            creep.memory.repairer = false;
        }
        if(creep.memory.repairer){
        
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
