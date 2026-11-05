'use client'
import React, { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import { Color, IcosahedronGeometry, MeshDepthMaterial, MeshPhysicalMaterial, RGBADepthPacking } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { useMediaQuery } from 'usehooks-ts';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';


interface ExperimentProps {
    shouldReduceQuality: boolean;
    isMobile: boolean;
    onLoaded: () => void;
}
const Experiment: React.FC<ExperimentProps> = ({ shouldReduceQuality, isMobile, onLoaded }) => {
    const materialRef = useRef<any>(null);
    const depthMaterialRef = useRef<any>(null);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = elapsedTime;
        }

        if (depthMaterialRef.current) {
            depthMaterialRef.current.uniforms.uTime.value = elapsedTime;
        }
    });


    const gradientStrength = 1;
    const color = '#af00ff';
    const speed = 1.1;
    const noiseStrength = 0.3;
    const displacementStrength = 0.57;
    const fractAmount = 4;
    const roughness = 0.56;
    const metalness = 0.76;
    const clearcoat = 0;
    const reflectivity = 0.46;
    const ior = 2.81;
    const iridescence = 0.96;


    const ambientLightIntensity = 1;
    const ambientLightColor = '#fff';

    const directionalLightIntensity = 5;
    const directionalLightColor = '#fff';
    const directionalLightPositionX = -2;
    const directionalLightPositionY = 2;
    const directionalLightPositionZ = 3.5;

    const geometry = useMemo(() => {
        const geometry = mergeVertices(new IcosahedronGeometry(1.3, shouldReduceQuality ? 128 : 200));
        geometry.computeTangents();
        return geometry;
    }, [shouldReduceQuality]);

    const uniforms = {
        uTime: { value: 0 },
        uColor: { value: new Color(color) },
        uGradientStrength: { value: gradientStrength },
        uSpeed: { value: speed },
        uNoiseStrength: { value: noiseStrength },
        uDisplacementStrength: { value: displacementStrength },
        uFractAmount: { value: fractAmount },
    };

    useEffect(() => {
        onLoaded();
    }, [onLoaded]);

    return (
        <>
            <mesh geometry={geometry} frustumCulled={false} position={[0, isMobile ? -1.3 * 0 : 0, 0]}>
                <CustomShaderMaterial
                    ref={materialRef}
                    baseMaterial={MeshPhysicalMaterial}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    silent
                    roughness={roughness}
                    metalness={metalness}
                    reflectivity={reflectivity}
                    clearcoat={clearcoat}
                    ior={ior}
                    iridescence={iridescence}
                    uniforms={uniforms}
                />
                <CustomShaderMaterial
                    ref={depthMaterialRef}
                    baseMaterial={MeshDepthMaterial}
                    vertexShader={vertexShader}
                    uniforms={uniforms}
                    silent
                    depthPacking={RGBADepthPacking}
                    attach="customDepthMaterial"
                />
            </mesh>
            <ambientLight color={ambientLightColor} intensity={ambientLightIntensity} />
            <directionalLight
                color={directionalLightColor}
                intensity={directionalLightIntensity}
                position={[directionalLightPositionX, directionalLightPositionY, directionalLightPositionZ]}
            />
        </>
    );
};

const Experience = () => {
    const isTablet = useMediaQuery('(max-width: 1199px)');
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            document.body.classList.remove('loading');
        }
    }, [isLoaded]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div className="canvas-wrapper absolute w-full h-full">
            <Canvas
                camera={{
                    position: [0, 0, isTablet ? 9 : 5],
                    fov: 45,
                    near: 0.1,
                    far: 1000,
                }}
                gl={{ alpha: false }}

            >
                <Suspense fallback={null}>
                    <Experiment shouldReduceQuality={isTablet} isMobile={isMobile} onLoaded={handleLoad} />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default Experience;