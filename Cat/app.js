//Setup

let container;
let camera;
let controls;
let renderer;
let scene;
let mixer;

let clock = new THREE.Clock();

init();
animate();

function init(){
    container = document.querySelector(".scene");

    //Create Scene
    scene = new THREE.Scene();

    //Camera
    const fov = 60;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 5000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(-1000, 400, 2000);

    //Light
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-10,10,10);
    scene.add(light);

    //Ground
    /* var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid ); */

    //Load Model
    const loader = new THREE.GLTFLoader();
    loader.load( './3d-model/toon_cat_free/scene.gltf', function ( gltf ) {
        
        mixer = new THREE.AnimationMixer( gltf.scene.children[0] );
        var action = mixer.clipAction( gltf.animations[ 0 ] );
        action.play();

        scene.add( gltf.scene );


    } );

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    var delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera ); 

}



function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);




