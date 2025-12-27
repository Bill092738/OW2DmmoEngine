'use client';

import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

const GameCanvas = () => {
    // 使用 ref 來保存遊戲實例，防止 React 重渲染時重複創建遊戲
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        // 防止 React Strict Mode 在開發環境下創建兩個 Canvas
        if (gameRef.current) return;

        // 1. 定義 Phaser 配置
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO, // 自動選擇 WebGL
            width: 800,
            height: 600,
            parent: 'phaser-container', // 綁定到下方的 div id
            backgroundColor: '#2d2d2d',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 }, // 俯視視角不需要重力
                    debug: true // 開發模式開啟綠色調試框
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        // 2. 初始化遊戲
        gameRef.current = new Phaser.Game(config);

        // --- 臨時的場景函數 ---
        function preload(this: Phaser.Scene) {
            // 載入一個測試用的圖片 (使用 Phaser 官方範例圖) —— 僅供 PoC/開發使用，未來請改為載入專案內部的本地資源
            this.load.setBaseURL('https://labs.phaser.io');
            this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        }

        function create(this: Phaser.Scene) {
            const logo = this.add.image(400, 150, 'logo');
            
            // 添加一段文字證明成功
            this.add.text(280, 450, 'MMO Client Online', { 
                fontSize: '24px', 
                color: '#ffffff' 
            });

            // 簡單的動畫
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
            // 遊戲循環邏輯 (每一幀都會執行)
        }

        // 3. 組件卸載時的清理函數
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-center h-full">
            <div id="phaser-container" className="rounded-lg overflow-hidden border-4 border-gray-700 shadow-2xl" />
        </div>
    );
};

export default GameCanvas;