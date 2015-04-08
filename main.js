require("creep.protos");

for( var i in Game.creeps ) {
    var creep = Game.creeps[i];
    creep.memory.role = ["miner", "builder"]; // TODO : Drop this, should be part of spawning

    if( creep.memory.action=="idle" || ! creep.memory.action ) {
		// Start tasks for creeps that don't have tasks
        if ( creep.energy !== 0 && creep.memory.role.indexOf("builder") != -1 ) {
            creep.construct();
            console.log(creep.name,"building");
            continue;
        }
        if ( creep.energy < creep.energyCapacity && creep.memory.role.indexOf("miner") != -1 ) {
            creep.mine();
            console.log(creep.name,"mining");
            continue;
        }
    }
	else {
		// Continue Tasks
	    if( creep.memory.action=="build" ) {
	        creep.construct();
	        continue;
	    }
	    if( creep.memory.action=="mine" ) {
	        creep.mine();
	        continue;
	    }
	}
}
