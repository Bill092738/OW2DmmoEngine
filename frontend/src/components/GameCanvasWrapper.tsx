'use client';

import dynamic from 'next/dynamic';

// 關鍵：強制關閉 SSR，只在瀏覽器端載入 Phaser 元件
const GameCanvas = dynamic(() => import('@/components/GameCanvas'), { 
    ssr: false,
    loading: () => (
        <div className="flex justify-center items-center w-[800px] h-[600px] bg-black text-white">
            載入遊戲引擎中...
        </div>
    )
});

export default GameCanvas;
