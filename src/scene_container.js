function SceneContainer() {
  var cameraFlag = 1
	this.scene = new THREE.Scene();
	this.group = new THREE.Object3D();
	
	// build container
	this.cameraSphere = new THREE.Mesh(new THREE.SphereGeometry(150, 100, 100), new THREE.MeshNormalMaterial());
  this.cameraSphere.overdraw = true;
	
	// camera setup
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	this.camera.position.y = 150;
	this.camera.position.z = 500;
	this.cameraSphere.add( this.camera );
	
	this.otherCamera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	this.otherCamera.position.y = 150;
	this.otherCamera.position.z = 600;
   
  // directional lighting
  var ambientLight = new THREE.AmbientLight(0x222222);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  
  // define texture and other material constant
  var textureShader = Plane.TextureShader;
  var defaultShader = Plane.DefaultShader;
  var planeTexture = THREE.ImageUtils.loadTexture('textures/grass.jpg');
  textureShader.uniforms = {
      texture: { type: "t", value: planeTexture }
  };
  
  var grass = new THREE.ShaderMaterial(textureShader);
  var red = new THREE.ShaderMaterial(defaultShader);
  
  // plane geometry
  var geometry = new THREE.PlaneGeometry( 1000, 1000 );
  geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
  this.plane = new THREE.Mesh( geometry, grass );
  
  // cylinder geometry
  var cylinder_geometry = new THREE.CylinderGeometry(40, 40, 400, 50, 50, false)
  cylinder_geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 5 ) );
  var cylinder = new THREE.Mesh(cylinder_geometry, red);
  
  // build up scene graph
  this.group.add( this.plane );
  this.group.add( cylinder );
	
	// assign primitives to scene
	this.scene.add(this.cameraSphere);
	this.scene.add(ambientLight);
  this.scene.add(directionalLight);
	this.scene.add(this.group);

	// update position of our camera
  // T is tranformation matrix
  this.updateCamera = function(T){
    this.cameraSphere.applyMatrix(T);
  };
  
  // set selected scene camera
  // convetion: 
  // moving camera flag = 1
  // static camera flag = 2
  this.setCameraFlag = function(flag){
    cameraFlag = flag;
  };
  
  // get current selected scene camera
  this.getSelectedCamera = function() {
    if( cameraFlag == 1 ) {
      return this.camera;
    } else {
      return this.otherCamera;
    }
  };
}