function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );


    //三角形の値設定

    //表
    var vertices = [
	[-1,1,1],
	[1,1,1],
	[-1,-1,1],
	[1,-1,1],
	[-1,1,-1],
	[1,1,-1],
	[-1,-1,-1],
	[1,-1,-1]
    ];
    
    var faces = [
	[0,1,2],
	[1,2,3],
	[4,5,6],
	[5,6,7],
	[0,1,4],
	[1,4,5],
	[2,3,6],
	[3,6,7],
	[0,2,4],
	[2,4,6],
	[1,3,5],
	[3,5,7]
    ];

    var cube = getCube(vertices,faces);
    scene.add( cube );

    //renderer.render( scene, camera );

    //clickイベントの設定
    document.addEventListener('click',click_event,false);

    loop();

    function loop()
    {
	var speedx = 0.01;
	var speedy = 0.01;
	cube.rotation.x += speedx;
        cube.rotation.y += speedy;
        requestAnimationFrame( loop );
        renderer.render( scene, camera );

	}

    function getCube(vertices,faces){

	var geometry = new THREE.Geometry();
	for(var i = 0; i< 8;i++){
	    geometry.vertices.push(new THREE.Vector3().fromArray(vertices[i]));
	}
	for(var i = 0; i< 12;i++){
	    var id = faces[i];
	    geometry.faces.push(new THREE.Face3(id[0],id[1],id[2]));
	}
	
	
	/*var materials = [
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial(),
	    new THREE.MeshBasicMaterial()
	];
	for(i = 0; i< 12;i++){
	    materials[i].side = THREE.DoubleSide;
	    materials[i].vertexColors = THREE.FaceColors;
	    }*/
	var material = new THREE.MeshBasicMaterial();
	material.vertexColors = THREE.FaceColors;
	material.side = THREE.DoubleSide;
	geometry.faces[0].color = new THREE.Color(1,1,1);
	geometry.faces[1].color = new THREE.Color(1,1,1);
	geometry.faces[2].color = new THREE.Color(1,1,1);
	geometry.faces[3].color = new THREE.Color(1,1,1);
	geometry.faces[4].color = new THREE.Color(1,1,1);
	geometry.faces[5].color = new THREE.Color(1,1,1);
	geometry.faces[6].color = new THREE.Color(1,1,1);
	geometry.faces[7].color = new THREE.Color(1,1,1);
	geometry.faces[8].color = new THREE.Color(1,1,1);
	geometry.faces[9].color = new THREE.Color(1,1,1);
	geometry.faces[10].color = new THREE.Color(1,1,1);
	geometry.faces[11].color = new THREE.Color(1,1,1);
	
	var cube = new THREE.Mesh( geometry, material );
	return cube;
    }

    function click_event(e){
	var square = getIntersectedIndex(e);
	if(square !== undefined && cube){
	    cube.geometry.colorsNeedUpdate = true;
	    cube.geometry.faces[square].color.setRGB(1,0,0);
	}
	render.render(scene,camera);
    }

    function getIntersectedIndex(e){
	var x_win = e.clientX;
	var y_win = e.clientY;

	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;

	var x_NDC = 2*(x_win - vx)/vw -1;
	var y_NDC = -(2*(y_win - vy)/vh -1);

	var p_NDC = new THREE.Vector3(x_NDC,y_NDC,1);
	var p_wld = p_NDC.unproject(camera);
	
	var raycaster = new THREE.Raycaster(camera.position,p_wld.sub(camera.position).normalize());
	var intersects = raycaster.intersectObjects(scene.children);
	if(intersects.length > 0){
	    var square = intersects[0].faceIndex;
	}

	return square;
    }
	
    
}
