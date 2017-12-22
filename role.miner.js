var roleMiner = {
    
    /** @param {Creep} creep **/
    control: function(creep, id) {        
        var sources = creep.room.find(FIND_SOURCES);
        var sourceId = id % sources.length;
        if(creep.harvest(sources[sourceId]) == ERR_NOT_IN_RANGE) 
            creep.moveTo(sources[sourceId]);        
    }   
};

module.exports = roleMiner;

/*
var minerId = 0;
var workerId = 0;
for (var i in creeps){
    switch (creep.memory.role){
        case "miner":
            controlMiner(creep, minerId)
            minerId++;
            break;
        case "worker":
            controlWorker(creep, minerId)
            workerId++;
            break;
    }
}*/
