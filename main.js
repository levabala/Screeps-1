var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrer = require('role.carrer');

module.exports.loop = function () {
    
    var NumberCreep = Math.random();
    
    var tower = Game.getObjectById('2f643b3516b64dea818659d1');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //log('Clearing non-existing creep memory:', name);
        }
    }

    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    
    var carrers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrer');
    
    if(carrers.length < 2) {
        var newName = 'Carrer' + NumberCreep;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'carrer'}});
    }
    
    else if(miners.length < 2) {
        var newName = 'Miners' + NumberCreep;
        //console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'miner'}});
    }
    else if(builders.length < 5) {
        var newName = 'Builder' + NumberCreep;
        //console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    else if(upgraders.length < 1) {
        var newName = 'Upgrader' + NumberCreep;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    else if(repairers.length < 4) {
        var newName = 'Repairer' + NumberCreep;
        //console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'repairer'}});
    }

    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'carrer') {
            roleCarrer.run(creep);
        }
    }
}
