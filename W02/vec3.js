Vec3 = function( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.add = function( v )
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

Vec3.prototype.min = function()
{
    if(this.x > this.y){
	if(this.z > this.y){
	    return this.y;
	}
	else{
	    return this.z;
	}
    }
    else if(this.z > this.x){
	return this.x;
    }
    else{
	return this.z;
    }
}
	    
Vec3.prototype.mid = function()
{
    if(this.x > this.y){
	if(this.z > this.x){
	    return this.x;
	}
	else if(this.z > this.y){
	    return this.z;
	}
	else{
	    return this.y;
	}
    }
    else if(this.z > this.y){
	return this.y;
    }else if(this.z > this.x){
	return this.z;
    }else{
	return this.x;
    }
	
}

Vec3.prototype.max = function()
{
    if(this.x < this.y){
	if(this.z < this.y){
	    return this.y;
	}
	else{
	    return this.z;
	}
    }
    else if(this.z < this.x){
	return this.x;
    }
    else{
	return this.z;
    }
}
