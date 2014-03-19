var container, stats;
var SC, renderer;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
	SC = new SceneContainer();
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = 'PLANE MOTHAFUCKA';
	container.appendChild( info );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( 'keydown', onKeyDown, false);
}

function onKeyDown( event) {
  var T = new THREE.Matrix4();
  T.identity();
  var key = event.which ? event.which : event.keyCode;
  switch(key) {
    case 87: // w key
      // move camera foreward
      T.makeTranslation(1, 1, -10);
      break;
    case 83: // s key
      // move camera backward
      T.makeTranslation(1, 1, 10);
      break;
    case 68: // d key
      // rotation (uhrzeigersinn) camera um z-achse 
      break;
    case 65: // a key
      // rotation (ccw) camera um z-achse
      break;
    case 32: // space key
      // move up
      break;
    case 16: // shift
      // move down
      break;
  }
  SC.updateCamera(T);
  
  // keep this for debugging purposes
  console.log(key); 
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	SC.camera.aspect = window.innerWidth / window.innerHeight;
	SC.camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
	event.preventDefault();
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event ) {
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}

function render() {  
	SC.group.rotation.y += ( targetRotation - SC.group.rotation.y ) * 0.05;
	renderer.render( SC.scene, SC.camera );
}
