class PieceAnimation {
  constructor(scene, center, direction) {
    this.scene=scene;
    this.center=center;
    this.direction=direction;
    this.initialAngle=0;
    this.rotAngle= Math.PI;
    this.radius=2;
    this.currentTime=0;
    this.matrix=mat4.create();
    this.endOfAnimation=false;
    this.animationTime=10;
  }

  calculateAnimation(currentTime){

    if(this.currentTime <= 0)
    {
      this.currentTime = currentTime;
      return this.matrix;
    }
  
    //calculates the time passed in seconds (time given in milliseconds)
    var deltaTime = (currentTime - this.currentTime);
    if(this.animationTime < deltaTime)
      deltaTime = this.animationTime;
  
  
  
    this.deltaAngle = this.initialAngle + this.rotAngle / this.animationTime * this.currentTime;
    this.currentTime+=deltaTime;
  
  
    };
  
    update(deltaTime){
  
      if (this.currentTime<this.animationTime){
        this.calculateAnimation(deltaTime);
  
      }
    else {
      this.endOfAnimation=true;
    }
  }
  
  apply(){
    if (this.endOfAnimation)
    return this.matrix;
    
    var identMatrix = mat4.create();
    mat4.translate(identMatrix,identMatrix, this.center);
    mat4.rotate(identMatrix,identMatrix,-this.deltaAngle,[1,0,0]);
    mat4.translate(identMatrix,identMatrix, [0,this.radius,0]);
    if (this.rotAngle > 0) mat4.rotate(identMatrix, identMatrix, Math.PI, [0, 1, 0]);
    this.matrix = identMatrix;
      return identMatrix;
  
  }
}
