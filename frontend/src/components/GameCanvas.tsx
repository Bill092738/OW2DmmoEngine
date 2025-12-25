'use client';

import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

const GameCanvas = () => {
    // 使用 ref 来保存游戏实例，防止重渲染时丢失或重复创建
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        // 防止 React Strict Mode 在开发环境下创建两个 Canvas
        if (gameRef.current) return;

        // 1. 定义 Phaser 配置
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO, // 自动选择 WebGL 或 Canvas
            width: 800,
            height: 600,
            parent: 'phaser-container', // 挂载点的 DOM ID
            backgroundColor: '#2d2d2d',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 }, // 俯视视角不需要重力
                    debug: true // 开发模式开启调试框
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        // 2. 初始化游戏
        gameRef.current = new Phaser.Game(config);

        // --- 临时的场景函数 (之后会移到单独文件) ---
        function preload(this: Phaser.Scene) {
            // 暂时画一个方块代替图片，避免找不到资源的报错
            this.load.setBaseURL('https://labs.phaser.io');
            this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        }

        function create(this: Phaser.Scene) {
            const logo = this.add.image(400, 150, 'logo');
            
            // 添加一段文字
            this.add.text(100, 450, 'Fedora MMO Client Ready!', { 
                fontSize: '32px', 
                color: '#ffffff' 
            });

            // 简单的动画
            this.tweens.add({
                targets: logo,
                y: 450,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
                loop: -1
            });
        }

        function update(this: Phaser.Scene) {
            // 游戏循环逻辑
        }

        // 3. 组件卸载时的清理函数
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    // 返回一个 div 作为 Phaser 的挂载点
    return <div id="phaser-container" className="rounded-lg overflow-hidden shadow-2xl" />;
};

export default GameCanvas;