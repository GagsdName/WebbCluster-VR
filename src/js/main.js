(function() {

var scene,
    camera,
    renderer,
    //colorScale,
    colorScaleRed,
    colorScaleWhite,
    colorScaleBlue,
    controls,
    visibles,
    visibleParticles,
    clusters,
    clusterParticles,
    checkRotate,
    checkVisible,
    checkCluster,
    radioFovHuman,
    radioFovWide,
    FOV_HUMAN = 27,
    FOV_WIDE = 75,
    ROTATE_ANGLE_HUMAN = 0.001,
    ROTATE_ANGLE_WIDE = 0.003,
    ROTATE_AXIS = new THREE.Vector3(1, 0, 0),
    rotateAngle,
    radioFlyTo0,
    radioFlyTo5,
    radioFlyTo10;

init();

animate();

Papa.parse('data/movie.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (results) {
        createGeometry(results.data, 'cluster');
    }
});

Papa.parse('data/visible.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (results) {
        createGeometry(results.data, 'visible');
    }
});



function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(FOV_WIDE,
                                         window.innerWidth / window.innerHeight,
                                         0.1,
                                         20000);

    rotateAngle = ROTATE_ANGLE_HUMAN;
    //camera.setLens(300);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    effect = new THREE.StereoEffect( renderer );
    
    alert(effect);
	controls = new THREE.MouseControls( camera );

    document.body.appendChild( renderer.domElement );

    /*colorScale = chroma.scale(['white', 'gainsboro', 'black'])
        .domain([-9, -1, 6.5]);*/

    colorScaleRed = chroma.scale(['lightyellow', 'peachpuff', 'black'])
        .domain([-9, -1, 6.5]);

    colorScaleWhite = chroma.scale(['white', 'gainsboro', 'black'])
        .domain([-9, -1, 6.5]);

    colorScaleBlue = chroma.scale(['lightcyan', 'lightsteelblue', 'black'])
        .domain([-9, -1, 6.5]);

    checkRotate = document.getElementById('rotate');
    checkVisible = document.getElementById('visible');
    checkCluster = document.getElementById('cluster');
    radioFovHuman = document.getElementById('fovHuman');
    radioFovWide = document.getElementById('fovWide');
    radioFlyTo0 = document.getElementById('flyTo0');
    radioFlyTo5 = document.getElementById('flyTo5');
    radioFlyTo10 = document.getElementById('flyTo10');

    checkVisible.addEventListener('click', function() {
        visibleParticles.visible = checkVisible.checked;
    });

    checkCluster.addEventListener('click', function() {
        clusterParticles.visible = checkCluster.checked;
    });

    radioFovHuman.addEventListener('click', function() {
        TweenLite.to(camera, 1, {fov: FOV_HUMAN, onUpdate: function() {
            camera.updateProjectionMatrix();
        }, onComplete: function() {
            rotateAngle = ROTATE_ANGLE_HUMAN;
        }});
    });

    radioFovWide.addEventListener('click', function() {
        TweenLite.to(camera, 1, {fov: FOV_WIDE, onUpdate: function() {
            camera.updateProjectionMatrix();
        }, onComplete: function() {
            rotateAngle = ROTATE_ANGLE_WIDE;
        }});
    });

    radioFlyTo0.addEventListener('click', function() {
        flyTo(new THREE.Vector3(0, 0, 0));
    });

    radioFlyTo5.addEventListener('click', function() {
        flyTo(new THREE.Vector3(0, 0, 5));
    });

    radioFlyTo10.addEventListener('click', function() {
        flyTo(new THREE.Vector3(0, 0, 10));
    });
}

function createGeometry(data, name) {
    var geometry = new THREE.Geometry(),
        size = 2,
        material,
        particles,
        color;


    for (var i = 0; i < data.length; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = data[i].X;
        vertex.y = data[i].Y;
        vertex.z = data[i].Z;
        geometry.vertices.push( vertex );

        color = calculateColor(data[i]);
        geometry.colors.push( color );
    }


    material = new THREE.PointsMaterial({
        size: size,
        sizeAttenuation: false,
        vertexColors: THREE.VertexColors
    });
    particles = new THREE.Points( geometry, material );
    particles.name = name;
    scene.add( particles );

    if (name === 'visible') {
        visibles = data;
        visibleParticles = particles;
    } else if (name === 'cluster') {
        clusters = data;
        clusterParticles = particles;
    }
}

function animate() {

    requestAnimationFrame( animate );

    controls.update();

    render();
}

function render() {
    if (checkRotate.checked) {
        visibleParticles.rotateOnAxis(ROTATE_AXIS, rotateAngle);
        clusterParticles.rotateOnAxis(ROTATE_AXIS, rotateAngle);
    }

    renderer.render(scene, camera);
}

/**
 * Calculate the apparent magnitude and color mapping of the star
 * @param star
 */
function calculateColor(star) {
    var distance = {}, m, color;

    distance.x = star.X - camera.position.x;
    distance.y = star.Y - camera.position.y;
    distance.z = star.Z - camera.position.z;
    distance.total = Math.sqrt(Math.pow(distance.x, 2) +
                               Math.pow(distance.y, 2) +
                               Math.pow(distance.z, 2));

    m = star.M - 5 * (1 - Math.log10(distance.total));

    //color = colorScale(m).gl();

    if (star.T < 4000) {
        color = colorScaleRed(m).gl();
    } else if (star.T > 10000) {
        color = colorScaleBlue(m).gl();
    } else {
        color = colorScaleWhite(m).gl();
    }

    return new THREE.Color(color[0], color[1], color[2]);
}

/**
 * Move camera to the given location
 * @param location
 */
function flyTo(location) {
    // fly to new position
    var oldPosition = camera.position;
    camera.position.set(location.x, location.y, location.z);

    // calculate new m and colors
    /*for (var i = 0, l = visibleParticles.geometry.colors.length; i < l; i++) {
        visibleParticles.geometry.colors[i] = calculateColor(visibles[i]);
    }*/

    for (var j = 0, m = clusterParticles.geometry.colors.length; j < m; j++) {
        clusterParticles.geometry.colors[j] = calculateColor(clusters[j]);
    }

    visibleParticles.geometry.colorsNeedUpdate = true;
    clusterParticles.geometry.colorsNeedUpdate = true;

    // set new rotation origin
    visibleParticles.position.set(location.x, location.y, location.z);
    /*visibleParticles.geometry.translate(oldPosition.x - location.x,
                                        oldPosition.y - location.y,
                                        oldPosition.z - location.z);*/

    clusterParticles.position.set(location.x, location.y, location.z);
    clusterParticles.geometry.translate(oldPosition.x - location.x,
                                        oldPosition.y - location.y,
                                        oldPosition.z - location.z);
}

})();
