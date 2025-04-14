import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial, Stars } from '@react-three/drei';

function Badge({ text, color }: { text: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (textRef.current) {
      textRef.current.rotation.y = -meshRef.current!.rotation.y;
      textRef.current.rotation.x = -meshRef.current!.rotation.x;
    }
  });

  return (
    <>
      <Stars count={200} depth={50} fade speed={1} />
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.3, 32, 100]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
        <mesh ref={textRef}>
          <Text
            position={[0, 0, 0.35]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            font="/fonts/inter-bold.woff"
          >
            {text}
          </Text>
        </mesh>
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </>
  );
}

interface Badge3DProps {
  text: string;
  color: string;
}

export function Badge3D({ text, color }: Badge3DProps) {
  return (
    <div className="w-48 h-48">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Badge text={text} color={color} />
      </Canvas>
    </div>
  );
}