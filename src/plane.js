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
  var LookAtpoint = new THREE.Vector3( 0, 0, -1);
  var T = new THREE.Matrix4();
  T.identity();
  var key = event.which ? event.which : event.keyCode;
  switch(key) {
    case 87: // w key
      // move camera foreward
      var objPos = SC.cameraSphere.position;
      var cameraLook = new THREE.Vector3( 0, 0, -1 );  
      var origin = new THREE.Vector3(0,0,0);
      var refPoint = new THREE.Vector3(0,0,1);
      var originToRefPoint = new THREE.Vector3();
      var objPosToRefPoint = new THREE.Vector3();
      
      // camera look at sphere direction vector
      cameraLook.applyQuaternion( SC.cameraSphere.quaternion );
      cameraLook.normalize();
      
      // fromObjPosToRefPoint
      objPosToRefPoint.subVectors(objPos, refPoint);
      objPosToRefPoint.normalize();
      
      // will need this for sign changes 
      var PosDOTVec = objPosToRefPoint.dot(cameraLook); 
      if(Math.abs(PosDOTVec) < 1.0e-5) {
        PosDOTVec = 1;
      } 
      
      console.log(PosDOTVec);
      
      var angle = Math.acos(PosDOTVec);
      console.log(angle);

      
      var Rotation = new THREE.Matrix4();
      Rotation.makeRotationY( angle );
      refPoint.applyMatrix4( Rotation );
      refPoint.multiplyScalar(-10);
      T.makeTranslation(refPoint.x, refPoint.y, refPoint.z);
      break;
      
    case 83: // s key
      // move camera backward
      T.makeTranslation(0, 0, 10);
      break;
    case 68: // d key
      // rotation (uhrzeigersinn) camera um z-achse 
      break;
    case 65: // a key
      // eigen-rotation (ccw) camera um z-achse
      var moveToOrigin = new THREE.Matrix4();
      var moveBack = new THREE.Matrix4();
      var Rot = new THREE.Matrix4();
      var currentPos = SC.cameraSphere.position;
      
      moveToOrigin.makeTranslation( -currentPos.x, -currentPos.y, -currentPos.z );
      Rot.makeRotationY( Math.PI / 120 );
      moveBack.makeTranslation( currentPos.x, currentPos.y, currentPos.z );
      
      // x' = BACK*ROTATION*ORIGIN*x
      Rot.multiply( moveToOrigin );
      moveBack.multiply( Rot );
      
      T = moveBack;
      break;
    case 32: // space key
      // move up
      T.makeTranslation(0, 10, 0);
      break;
    case 16: // shift
      // move down
      T.makeTranslation(0, -10, 0);
      break;
    case 49: // select moving camera
      // press '1'
      SC.setCameraFlag(1);
      break;
   case 50: // select static camera
      // press '2'
      SC.setCameraFlag(2);
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
	renderer.render( SC.scene, SC.getSelectedCamera() );
}
