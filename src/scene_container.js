function SceneContainer() {
  this.scene = new THREE.Scene();
  this.group = new THREE.Object3D();

  // camera setup
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 3000 );
  this.camera.position.y = 150;
  this.camera.position.z = 1000;

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
  var phong = new THREE.MeshPhongMaterial({
    // light
    specular: '#a9fcff',
    // intermediate
    color: '#00abb1',
    // dark
    emissive: '#006063',
    shininess: 100
  });

  // plane geometry
  var geometry = new THREE.PlaneGeometry( 1000, 1000 );
  geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
  this.plane = new THREE.Mesh( geometry, grass );

  // cylinder geometry
  var cylinder_geometry = new THREE.CylinderGeometry(40, 40, 400, 50, 50, false)
  cylinder_geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 5 ) );
  var cylinder = new THREE.Mesh(cylinder_geometry, red);

  // obj loader  
  var loader = new THREE.OBJLoader();
  var g = this.group;
  loader.load( "obj/teapot.obj", function ( object ) {
    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        child.material = red;
      }
    } );
    
    var m1 = new THREE.Matrix4();
    m1.identity();
    m1.multiplyScalar(15);
    object.applyMatrix(m1);
    g.add(object);
    console.log("Added apple");
  } );

  // build up scene graph
  this.group.add( this.plane );
  this.group.add( cylinder );

  // assign primitives to scene
  this.scene.add(ambientLight);
  this.scene.add(directionalLight);
  this.scene.add(this.group);
}
