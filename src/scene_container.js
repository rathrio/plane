function SceneContainer() {
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	this.camera.position.y = 150;
	this.camera.position.z = 500;
	this.scene = new THREE.Scene();
	
	var planeTexture = THREE.ImageUtils.loadTexture('textures/grass.jpg');
	var geometry = new THREE.PlaneGeometry( 200, 200 );
  geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
  // var material = new THREE.MeshLambertMaterial( { map: planeTexture, color: 0xe0e0e0, overdraw: 0.5 } );

  var material = new THREE.ShaderMaterial(Plane.DefaultShader);
	this.plane = new THREE.Mesh( geometry, material );
	this.scene.add( this.plane );
	
	// update position of our camera
  // T is tranformation matrix
  this.updateCamera = function(T){
    var cPos3f = this.camera.position;
    var cPos4f = new THREE.Vector4( cPos3f.x, cPos3f.y, cPos3f.z, 1.0 );    
    var newCPos4f = cPos4f.applyMatrix4( T );
    this.camera.position.x = newCPos4f.x;
    this.camera.position.y = newCPos4f.y;
    this.camera.position.z = newCPos4f.z;
  };
}


