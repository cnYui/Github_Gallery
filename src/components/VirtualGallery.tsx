import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const VirtualGallery: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const controlsRef = useRef<{
    moveForward: boolean;
    moveBackward: boolean;
    moveLeft: boolean;
    moveRight: boolean;
    mouseX: number;
    mouseY: number;
    isPointerLocked: boolean;
    mouseSensitivity: number;
    yaw: number;
    pitch: number;
  }>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    mouseX: 0,
    mouseY: 0,
    isPointerLocked: false,
    mouseSensitivity: 0.002,
    yaw: 0,
    pitch: 0,
  });

  // 艺术作品数据 - 扩展到16幅画作
  const artworks = [
    {
      url: "https://images.unsplash.com/photo-1703593191719-d22deaacd43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW4lMjBnb2doJTIwc3VuZmxvd2VycyUyMHBhaW50aW5nfGVufDF8fHx8MTc1NjI1MDcyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "向日葵"
    },
    {
      url: "https://images.unsplash.com/photo-1562041307-4e4465343615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW4lMjBnb2doJTIwc3RhcnJ5JTIwbmlnaHQlMjBwYWludGluZ3xlbnwxfHx8fDE3NTYyNTA3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "星夜"
    },
    {
      url: "https://images.unsplash.com/photo-1665110156567-542d71fe0b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb25ldCUyMHdhdGVyJTIwbGlsaWVzJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzU2MjUwNzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "睡莲"
    },
    {
      url: "https://images.unsplash.com/photo-1536241455566-5709c3aefd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1vZGVybiUyMGFydCUyMHBhaW50aW5nfGVufDF8fHx8MTc1NjIyMDg5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "抽象艺术"
    },
    {
      url: "https://images.unsplash.com/photo-1720323808592-71be40bf3070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBvaWwlMjBwYWludGluZyUyMGNsYXNzaWN8ZW58MXx8fHwxNzU2MjUwNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "风景画"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBhaW50aW5nJTIwY2xhc3NpY3xlbnwxfHx8fDE3NTYyNTA3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "古典肖像"
    },
    {
      url: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlsbCUyMGxpZmUlMjBwYWludGluZ3xlbnwxfHx8fDE3NTYyNTA3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "静物画"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbXByZXNzaW9uaXN0JTIwcGFpbnRpbmd8ZW58MXx8fHwxNzU2MjUwNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "印象派作品"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc1NjI1MDczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "现代艺术"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWJpc20lMjBwYWludGluZ3xlbnwxfHx8fDE3NTYyNTA3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "立体主义"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJyZWFsaXNtJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzU2MjUwNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "超现实主义"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHByZXNzaW9uaXNtJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzU2MjUwNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "表现主义"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXNtJTIwYXJ0fGVufDF8fHx8MTc1NjI1MDczNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "极简主义"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnR8ZW58MXx8fHwxNzU2MjUwNzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "当代艺术"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjBhcnQlMjBwYWludGluZ3xlbnwxfHx8fDE3NTYyNTA3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "波普艺术"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGV4cHJlc3Npb25pc218ZW58MXx8fHwxNzU2MjUwNzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "抽象表现主义"
    }
  ];

  // 创建深色木纹地板纹理
  const createDarkWoodFloorTexture = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;
    
    // 深色木质基础色
    context.fillStyle = '#2c1810';
    context.fillRect(0, 0, width, height);
    
    // 木纹条纹
    for (let i = 0; i < width; i += 60) {
      const gradient = context.createLinearGradient(i, 0, i + 60, 0);
      gradient.addColorStop(0, '#1a0f08');
      gradient.addColorStop(0.2, '#3d2415');
      gradient.addColorStop(0.4, '#2c1810');
      gradient.addColorStop(0.6, '#4a2e1a');
      gradient.addColorStop(0.8, '#2c1810');
      gradient.addColorStop(1, '#1a0f08');
      
      context.fillStyle = gradient;
      context.fillRect(i, 0, 60, height);
    }
    
    // 木纹细节
    for (let i = 0; i < 30; i++) {
      context.strokeStyle = `rgba(10, 6, 3, ${0.3 + Math.random() * 0.4})`;
      context.lineWidth = 0.5 + Math.random() * 1;
      context.beginPath();
      context.moveTo(0, Math.random() * height);
      context.lineTo(width, Math.random() * height);
      context.stroke();
    }
    
    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // 黑色背景
    sceneRef.current = scene;

    // 初始化摄像机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // 设置相机位置 - 固定高度为1.6米
    const FIXED_HEIGHT = 1.6;
    camera.position.set(0, FIXED_HEIGHT, 6);
    cameraRef.current = camera;

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 照明系统 - 现代美术馆风格
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // 微弱环境光
    scene.add(ambientLight);

    // 主要照明
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(0, 10, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    scene.add(mainLight);

    // 创建深色木质地板
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const woodTexture = createDarkWoodFloorTexture(1024, 1024);
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(3, 3);
    
    const floorMaterial = new THREE.MeshPhysicalMaterial({
      map: woodTexture,
      roughness: 0.6,
      metalness: 0.02,
      clearcoat: 0.4,
      clearcoatRoughness: 0.4,
      reflectivity: 0.3
    });
    
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 创建黑色天花板
    const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
    const ceilingMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      roughness: 0.9,
      metalness: 0.1
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 7.5;
    scene.add(ceiling);

    // 创建浅灰色墙壁
    const wallMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f5, // 浅灰白色
      roughness: 0.8,
      metalness: 0.02
    });

    // 后墙
    const backWallGeometry = new THREE.PlaneGeometry(20, 7.5);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 3.75, -10);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // 左墙
    const leftWallGeometry = new THREE.PlaneGeometry(20, 7.5);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-10, 3.75, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // 右墙
    const rightWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    rightWall.position.set(10, 3.75, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // 前墙
    const frontWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    frontWall.position.set(0, 3.75, 10);
    frontWall.rotation.y = Math.PI;
    frontWall.receiveShadow = true;
    scene.add(frontWall);

    // 创建艺术品展示
    const frameGroup = new THREE.Group();
    const textureLoader = new THREE.TextureLoader();

    // 展示位置配置 - 四面墙均匀分布12幅画作
    // 观看高度设置为3米，符合人体工程学
    const ARTWORK_HEIGHT = 3;
    console.log('当前画作高度设置:', ARTWORK_HEIGHT, '米'); // 调试信息
    const artworkPositions = [
      // 后墙 - 3幅画作，间距6米
      { wall: 'back', x: -6, y: ARTWORK_HEIGHT, z: -9.9, rotation: 0 },
      { wall: 'back', x: 0, y: ARTWORK_HEIGHT, z: -9.9, rotation: 0 },
      { wall: 'back', x: 6, y: ARTWORK_HEIGHT, z: -9.9, rotation: 0 },
      
      // 左墙 - 3幅画作，间距6米
      { wall: 'left', x: -9.9, y: ARTWORK_HEIGHT, z: -6, rotation: Math.PI / 2 },
      { wall: 'left', x: -9.9, y: ARTWORK_HEIGHT, z: 0, rotation: Math.PI / 2 },
      { wall: 'left', x: -9.9, y: ARTWORK_HEIGHT, z: 6, rotation: Math.PI / 2 },
      
      // 右墙 - 3幅画作，间距6米
      { wall: 'right', x: 9.9, y: ARTWORK_HEIGHT, z: -6, rotation: -Math.PI / 2 },
      { wall: 'right', x: 9.9, y: ARTWORK_HEIGHT, z: 0, rotation: -Math.PI / 2 },
      { wall: 'right', x: 9.9, y: ARTWORK_HEIGHT, z: 6, rotation: -Math.PI / 2 },
      
      // 前墙 - 3幅画作，间距6米
      { wall: 'front', x: -6, y: ARTWORK_HEIGHT, z: 9.9, rotation: Math.PI },
      { wall: 'front', x: 0, y: ARTWORK_HEIGHT, z: 9.9, rotation: Math.PI },
      { wall: 'front', x: 6, y: ARTWORK_HEIGHT, z: 9.9, rotation: Math.PI }
    ];

    artworks.forEach((artwork, index) => {
      if (index < artworkPositions.length) {
        const pos = artworkPositions[index];
        
        // 创建画框
        const frameGeometry = new THREE.BoxGeometry(2.2, 2.7, 0.08);
        const frameMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x1a1a1a,
          roughness: 0.3,
          metalness: 0.8,
          clearcoat: 0.9
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(pos.x, pos.y, pos.z);
        frame.rotation.y = pos.rotation;
        frame.castShadow = true;
        frame.receiveShadow = true;
        frameGroup.add(frame);

        // 加载并创建艺术品纹理
        textureLoader.load(artwork.url, (texture) => {
          texture.flipY = false;
          
          const artworkGeometry = new THREE.PlaneGeometry(2, 2.5);
          const artworkMaterial = new THREE.MeshPhysicalMaterial({
            map: texture,
            roughness: 0.1,
            metalness: 0.0
          });
          
          const artworkMesh = new THREE.Mesh(artworkGeometry, artworkMaterial);
          
          // 根据墙面位置设置艺术品偏移，确保在画框前方
          let offsetX = 0, offsetZ = 0;
          if (pos.wall === 'back') {
            offsetZ = 0.05; // 向前偏移
          } else if (pos.wall === 'left') {
            offsetX = 0.05; // 向右偏移
          } else if (pos.wall === 'right') {
            offsetX = -0.05; // 向左偏移
          } else if (pos.wall === 'front') {
            offsetZ = -0.05; // 向后偏移
          }
          
          artworkMesh.position.set(
            pos.x + offsetX,
            pos.y,
            pos.z + offsetZ
          );
          console.log(`画作 ${index + 1} 位置:`, artworkMesh.position); // 调试画作位置
          artworkMesh.rotation.y = pos.rotation;
          frameGroup.add(artworkMesh);
        });

        // 为每件艺术品添加聚光灯
        const spotLight = new THREE.SpotLight(0xffffff, 1.2, 15, Math.PI * 0.2, 0.3, 1);
        
        // 根据墙面位置设置聚光灯位置
        if (pos.wall === 'back') {
          spotLight.position.set(pos.x, 6, pos.z + 2);
          spotLight.target.position.set(pos.x, pos.y, pos.z);
        } else if (pos.wall === 'left') {
          spotLight.position.set(pos.x + 2, 6, pos.z);
          spotLight.target.position.set(pos.x, pos.y, pos.z);
        } else if (pos.wall === 'right') {
          spotLight.position.set(pos.x - 2, 6, pos.z);
          spotLight.target.position.set(pos.x, pos.y, pos.z);
        } else if (pos.wall === 'front') {
          spotLight.position.set(pos.x, 6, pos.z - 2);
          spotLight.target.position.set(pos.x, pos.y, pos.z);
        }
        
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        scene.add(spotLight);
        scene.add(spotLight.target);
      }
    });

    scene.add(frameGroup);

    // 踢脚线
    const baseBoardHeight = 0.1;
    const baseBoardMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0e0e0,
      roughness: 0.7,
      metalness: 0.05
    });
    
    // 后墙踢脚线
    const backBaseBoardGeometry = new THREE.BoxGeometry(20, baseBoardHeight, 0.05);
    const backBaseBoard = new THREE.Mesh(backBaseBoardGeometry, baseBoardMaterial);
    backBaseBoard.position.set(0, baseBoardHeight / 2, -9.975);
    backBaseBoard.castShadow = true;
    backBaseBoard.receiveShadow = true;
    scene.add(backBaseBoard);
    
    // 左墙踢脚线
    const leftBaseBoardGeometry = new THREE.BoxGeometry(0.05, baseBoardHeight, 20);
    const leftBaseBoard = new THREE.Mesh(leftBaseBoardGeometry, baseBoardMaterial);
    leftBaseBoard.position.set(-9.975, baseBoardHeight / 2, 0);
    leftBaseBoard.castShadow = true;
    leftBaseBoard.receiveShadow = true;
    scene.add(leftBaseBoard);

    // 右墙踢脚线
    const rightBaseBoard = new THREE.Mesh(leftBaseBoardGeometry, baseBoardMaterial);
    rightBaseBoard.position.set(9.975, baseBoardHeight / 2, 0);
    rightBaseBoard.castShadow = true;
    rightBaseBoard.receiveShadow = true;
    scene.add(rightBaseBoard);

    // 前墙踢脚线
    const frontBaseBoard = new THREE.Mesh(backBaseBoardGeometry, baseBoardMaterial);
    frontBaseBoard.position.set(0, baseBoardHeight / 2, 9.975);
    frontBaseBoard.castShadow = true;
    frontBaseBoard.receiveShadow = true;
    scene.add(frontBaseBoard);

    // 控制处理
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          controlsRef.current.moveForward = true;
          break;
        case 'KeyS':
          controlsRef.current.moveBackward = true;
          break;
        case 'KeyA':
          controlsRef.current.moveLeft = true;
          break;
        case 'KeyD':
          controlsRef.current.moveRight = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          controlsRef.current.moveForward = false;
          break;
        case 'KeyS':
          controlsRef.current.moveBackward = false;
          break;
        case 'KeyA':
          controlsRef.current.moveLeft = false;
          break;
        case 'KeyD':
          controlsRef.current.moveRight = false;
          break;
      }
    };

    // 鼠标点击锁定指针
    const handleMouseClick = () => {
      if (!controlsRef.current.isPointerLocked) {
        renderer.domElement.requestPointerLock();
      }
    };

    // 指针锁定状态变化
    const handlePointerLockChange = () => {
      controlsRef.current.isPointerLocked = document.pointerLockElement === renderer.domElement;
    };

    // 鼠标移动控制视角
    const handleMouseMove = (event: MouseEvent) => {
      if (!controlsRef.current.isPointerLocked) return;

      const deltaX = event.movementX || 0;
      const deltaY = event.movementY || 0;

      // 更新yaw和pitch角度
      controlsRef.current.yaw -= deltaX * controlsRef.current.mouseSensitivity;
      controlsRef.current.pitch -= deltaY * controlsRef.current.mouseSensitivity;

      // 限制pitch角度，防止过度旋转
      controlsRef.current.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, controlsRef.current.pitch));

      // 应用旋转到摄像机
      camera.rotation.order = 'YXZ';
      camera.rotation.y = controlsRef.current.yaw;
      camera.rotation.x = controlsRef.current.pitch;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // 事件监听
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    renderer.domElement.addEventListener('click', handleMouseClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      // 移除自动旋转功能

      const moveSpeed = 0.04; // 降低移动速度，提升体验
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      
      // 只允许水平移动，保持固定高度
      const horizontalDirection = new THREE.Vector3(direction.x, 0, direction.z).normalize();
      
      if (controlsRef.current.moveForward) {
        camera.position.addScaledVector(horizontalDirection, moveSpeed);
      }
      if (controlsRef.current.moveBackward) {
        camera.position.addScaledVector(horizontalDirection, -moveSpeed);
      }
      if (controlsRef.current.moveLeft) {
        const left = new THREE.Vector3().crossVectors(camera.up, horizontalDirection).normalize();
        camera.position.addScaledVector(left, moveSpeed);
      }
      if (controlsRef.current.moveRight) {
        const right = new THREE.Vector3().crossVectors(horizontalDirection, camera.up).normalize();
        camera.position.addScaledVector(right, moveSpeed);
      }

      // 限制移动范围并固定高度
      camera.position.x = Math.max(-9, Math.min(9, camera.position.x));
      camera.position.z = Math.max(-9, Math.min(9, camera.position.z));
      camera.position.y = FIXED_HEIGHT; // 始终保持固定高度

      renderer.render(scene, camera);
    };

    animate();

    // 清理函数
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      renderer.domElement.removeEventListener('click', handleMouseClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default VirtualGallery;