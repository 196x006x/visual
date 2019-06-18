function main()
{
    var volume = new KVS.CreateTornadoData( 64, 64, 64 );
    var screen = new KVS.THREEScreen();

    screen.init(volume, {
      width: window.innerWidth * 0.3,
      height: window.innerHeight * 0.3,
      targetDom: document.getElementById('display'),
      enableAutoResize: false
    });
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 0, 0, 0 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 2 );
        streamWidth = 1;
        seedPointX = 32;
        seedPointY = 32;
        seedPointZ = 32;

        //var seed_point = volume.objectCenter();
        var seed_point = new KVS.Vec3(seedPointX,seedPointY,seedPointZ);
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 500 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( streamWidth );
        streamline.setSeedPoint( seed_point );

        //document.getElementById('widthlabel').innerHTML = "streamWidth: " + Math.round( streamWidth );
        document.getElementById('Xlabel').innerHTML = "seedPointX: " + Math.round( seedPointX );
        document.getElementById('Ylabel').innerHTML = "seedPointY: " + Math.round( seedPointY );
        document.getElementById('Zlabel').innerHTML = "seedPointZ: " + Math.round( seedPointZ );

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );

        /*document.getElementById('streamWidth').addEventListener('mousemove', function() {
                var value = +document.getElementById('streamWidth').value;
                var streamWidth = value;
                document.getElementById('widthlabel').innerHTML = "streamWidth: " + Math.round( streamWidth );
        });

        document.getElementById('change-streamWidth-button').addEventListener('click', function() {
                screen.scene.remove( line2 );
                var value = +document.getElementById('streamWidth').value;
                var streamWidth = value;
                streamline.setLineWidth( streamWidth );
                var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
                screen.scene.add( line2 );
        });*/

        document.getElementById('seedPointX')
            .addEventListener('mousemove', function() {
                var value = +document.getElementById('seedPointX').value;
                var seedPointX = value;
                document.getElementById('Xlabel').innerHTML = "seedPointX: " + Math.round( seedPointX );
        });

        /*document.getElementById('change-seedPointX-button')
            .addEventListener('click', function() {
                screen.scene.remove( line2 );
                var value = +document.getElementById('seedPointX').value;
                var seedPointX = value;
                var seed_point = new KVS.Vec3(seedPointX,seedPointY,seedPointZ);
                streamline.setSeedPoint( seed_point );
                line2 = KVS.ToTHREELine( streamline.exec( volume ) );
                screen.scene.add( line2 );
        });*/

        document.getElementById('seedPointY')
            .addEventListener('mousemove', function() {
                var value = +document.getElementById('seedPointY').value;
                var seedPointY = value;
                document.getElementById('Ylabel').innerHTML = "seedPointY: " + Math.round( seedPointY );
        });

        /*document.getElementById('change-seedPointY-button')
            .addEventListener('click', function() {
                screen.scene.remove( line2 );
                var value = +document.getElementById('seedPointY').value;
                var seedPointY = value;
                var seed_point = new KVS.Vec3(seedPointX,seedPointY,seedPointZ);
                streamline.setSeedPoint( seed_point );
                line2 = KVS.ToTHREELine( streamline.exec( volume ) );
                screen.scene.add( line2 );
        });*/

        document.getElementById('seedPointZ')
            .addEventListener('mousemove', function() {
                var value = +document.getElementById('seedPointZ').value;
                var seedPointZ = value;
                document.getElementById('Zlabel').innerHTML = "seedPointZ: " + Math.round( seedPointZ );
        });

        /*document.getElementById('change-seedPoint-button')
            .addEventListener('click', function() {
                screen.scene.remove( line2 );
                var value = +document.getElementById('seedPointZ').value;
                var seedPointZ = value;
                var seed_point = new KVS.Vec3(seedPointX,seedPointY,seedPointZ);
                streamline.setSeedPoint( seed_point );
                line2 = KVS.ToTHREELine( streamline.exec( volume ) );
                screen.scene.add( line2 );
        });*/

        document.getElementById('add-line-button')
            .addEventListener('click', function() {
              var value = +document.getElementById('seedPointX').value;
              var seedPointX = value;
              var value = +document.getElementById('seedPointY').value;
              var seedPointY = value;
              var value = +document.getElementById('seedPointZ').value;
              var seedPointZ = value;
              var seed_point = new KVS.Vec3(seedPointX,seedPointY,seedPointZ);
              streamline.setSeedPoint( seed_point );
              var add_line = KVS.ToTHREELine( streamline.exec( volume ) );
              screen.scene.add( add_line );
        });


        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });

        screen.draw();
    }
}
