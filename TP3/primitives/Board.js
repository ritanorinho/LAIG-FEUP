class Board extends  CGFobject {
	constructor(scene,dimX,dimZ){
    super(scene);
    this.dimX=dimX;
    this.dimZ=dimZ;
    this.cells=[];
    this.pieces=[];

    
    this.white = new CGFappearance(this.scene);
    this.white.setAmbient(1.0,1,1,1);
    this.white.setDiffuse(1.0,1,1,1);
    this.white.setSpecular(1.0,1,1,1);
    this.white.setShininess(0);
    this.white.loadTexture("images/white.jpg");
    this.black = new CGFappearance(this.scene);
    this.black.setAmbient(1.0,1,1,1);
    this.black.setDiffuse(1.0,1,1,1);
    this.black.setSpecular(1.0,1,1,1);
    this.black.setShininess(0);
    this.black.loadTexture("images/black.jpg");
    
    this.selectedMaterialWhite = new CGFappearance(this.scene);
    this.selectedMaterialWhite.setAmbient(1,0.71,0.76,1);
    this.selectedMaterialWhite.setDiffuse(1,0,0,1);
    this.selectedMaterialWhite.setSpecular(1,0,0,1);
    this.selectedMaterialWhite.setShininess(0);
    this.selectedMaterialWhite.loadTexture("images/white.jpg");

    this.selectedMaterialBlack = new CGFappearance(this.scene);
    this.selectedMaterialBlack.setAmbient(1,0.13,0.13,1);
    this.selectedMaterialBlack.setDiffuse(1,0,0,1);
    this.selectedMaterialBlack.setSpecular(1,0,0,1);
    this.selectedMaterialBlack.setShininess(0);
    this.selectedMaterialBlack.loadTexture("images/white.jpg");
    this.distanceBetweenCells=1.2;

    this.createBoard();
};


createBoard(){
    let i, j;
    let line=[];
    let pieceLine=[];
    for(i = 0; i < this.dimZ ; i++){
        for(j = 0; j < this.dimX; j++){
            line[j]=new Cube(this.scene,j,i);
            pieceLine[j]=new MyPiece(this.scene,j,i);
        }
        this.cells[i]=line;
        this.pieces[i]=pieceLine;
        line=[];
        pieceLine=[];
    }
};

display(){
let i,j;
let zDistance=0;
let id =1;
let material;
 for ( i = 0;i < this.dimZ;i++){
    for (j = 0; j < this.dimX;j++){
        this.scene.pushMatrix();
        this.scene.translate(j*this.distanceBetweenCells,0,i+zDistance);
        if ((j+i)%2==0){
            this.white.apply();
        }
        else this.black.apply();
        this.scene.scale(1, 0.25, 1);
       this.cells[j][i].display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(j*this.distanceBetweenCells,0,i+zDistance);

        this.scene.registerForPick(id, this.pieces[j][i]);
        
        id+=1;
        if(!this.pieces[j][i].isSelected){
        if ((j+i)%2==0){
            material=this.black;
        }
        else material=this.white;
    }
    else if((j+i)%2==0)
        material=this.selectedMaterialBlack;
    else
    material=this.selectedMaterialWhite;

        this.pieces[j][i].display(material);
        this.scene.clearPickRegistration();
        this.scene.popMatrix();
    }
    zDistance+=0.2;
    
}

};

updateTexCoords(length_s,length_t)
{
	
}
};
