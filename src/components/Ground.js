import React, {useRef, useState} from 'react';
import {useFrame, useUpdate} from 'react-three-fiber'
import {usePlane} from "use-cannon"
import {generateTerrain} from "../lib/terrainGeneration";
import {BufferGeometryLoader, Vector3} from "three";


export default function Ground({
                                   pointsSize,
                                   iterations,
                                   scaleMultiplier,
                                   erosionMultiplier,
                                   depositionMultiplier,
                                   evaporationMultiplier,
                                   worldSizeScale,
                                   calculateWaterCallback,
                                   calculateGroundHeightCallBack
                               }) {


    const mesh = useUpdate(({geometry}) => {

        const loader = new BufferGeometryLoader();


        let loadedGeometry = loader.load(
            '../data/defaultGeometry2.json',
            function (geometry) {
                return geometry;
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (err) {
                console.log('An error happened');
            }
        );
        if (loadedGeometry == null) {
            generateTerrain(geometry, pointsSize, iterations, scaleMultiplier, erosionMultiplier, depositionMultiplier, evaporationMultiplier, calculateWaterCallback)
        } else {
            geometry = loadedGeometry
        }


        geometry.attributes.color.needsUpdate = true
        geometry.needsUpdate = true

    }, [])


    return (
        <mesh
            ref={mesh} scale={[worldSizeScale, worldSizeScale, worldSizeScale]} position={new Vector3(0, 0 , 0)}>
            <bufferGeometry/>
            <meshPhongMaterial
                wireframe={false}
                vertexColors={true}
                flatShading={true}
            />

        </mesh>
    )
}

