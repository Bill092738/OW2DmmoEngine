import GameCanvas from '@/components/GameCanvasWrapper';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-zinc-900">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex text-white mb-8">
        <p>Open World MMO - Dev Build v0.1</p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          Status: <span className="text-green-400 ml-2">Connected</span>
        </div>
      </div>

      <div className="relative flex place-items-center">
        {/* 這裡載入我們的遊戲畫布 */}
        <GameCanvas />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mt-10">
        {/* 下方可以放一些測試按鈕 */}
        <button className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold text-white`}>
            Test Login
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-400`}>
            Connect to Java Backend
          </p>
        </button>
      </div>
    </main>
  );
}
