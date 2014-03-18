function SceneContainer() {
	this.scene = new THREE.Scene();
	this.group = new THREE.Object3D();
	
	// camera setup
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	this.camera.position.y = 150;
	this.camera.position.z = 500;
   
  // directional lighting
  var ambientLight = new THREE.AmbientLight(0x222222);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  
  // lookup code
  // var lambertiaMaterial = new THREE.MeshLambertMaterial( { map: planeTexture, color: 0xe0e0e0, overdraw: 0.5 } );
  // material
  var defaultWithTexture = Plane.DefaultShader;
  var planeTexture = THREE.ImageUtils.loadTexture('textures/grass.jpg');
  defaultWithTexture.uniforms = {
      texture: { type: "t", value: planeTexture }
  };
  var material = new THREE.ShaderMaterial(defaultWithTexture);
  
  // plane
  var geometry = new THREE.PlaneGeometry( 200, 200 );
  geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
  this.plane = new THREE.Mesh( geometry, material );
  
  // cylinder
  var cylinder_geometry = new THREE.CylinderGeometry(100, 100, 400, 50, 50, false)
  cylinder_geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 5 ) );
  var cylinder = new THREE.Mesh(cylinder_geometry, material);
  
	this.group.add( this.plane );
  this.group.add( cylinder );
	
	this.scene.add(ambientLight);
  this.scene.add(directionalLight);
	this.scene.add(this.group);
}