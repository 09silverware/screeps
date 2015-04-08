Creep.prototype.mine = function(source) {
	// Simple Mining Action Queue
    if( !this.memory.target ||
		this.memory.target === null ||
		typeof this.memory.target != "Source" )
		{
		this.memory.target = source ||
		this.pos.findClosest(FIND_SOURCES_ACTIVE);
		}
    if( this.memory.action != "mine" ) { this.memory.action = "mine"; }
    if(this.pos.isNearTo(this.memory.target)) {
        this.harvest(Game.getObjectById(this.memory.target.id));
        if( this.energy == this.energyCapacity ) {
			this.say("Full");
			this.memory.action = "idle";
			this.memory.target = null;
			return false;
		}
		if( this.memory.target.energy == 0 ) {
			this.say("Depleted");
			this.memory.action = "idle";
			this.memory.target = null;
			return false;
		}
		return true;
    }
	else {
		this.moveTo(this.memory.target,{"reusePath":5});
		return true;
	}
}
Creep.prototype.construct = function(site) {
	// Simple Construction Action Queue
    if( !this.memory.target ||
		this.memory.target === null ||
		typeof this.memory.target != "ConstructionSite" )
		{
		this.memory.target = site ||
		this.pos.findClosest(FIND_CONSTRUCTION_SITES);
		}
    if( this.memory.action != "build" ) { this.memory.action = "build"; }
    if(this.pos.isNearTo(this.memory.target)) {
        this.build(Game.getObjectById(this.memory.target.id));
        if(this.memory.target.progress == this.memory.target.progressTotal) {
			this.say("Done");
			this.memory.action = "idle";
			this.memory.target = null;
			return false;
			}
        if(this.energy === 0) {
			this.say("Empty");
			this.memory.action = "idle";
			this.memory.target = null;
			return false;
			}
		return true;
    }
	else {
		this.moveTo(this.memory.target,{"reusePath":5});
		return true;
	}
}
