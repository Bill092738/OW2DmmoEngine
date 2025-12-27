'use client';

import { useMemo, useState } from 'react';
import GameCanvas from '@/components/GameCanvasWrapper';

type ConnState = 'disconnected' | 'connecting' | 'connected' | 'error';

export default function Home() {
  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080',
    []
  );

  const [connState, setConnState] = useState<ConnState>('disconnected');
  const [connMessage, setConnMessage] = useState<string>('');

  async function handleTestLogin() {
    setConnState('connecting');
    setConnMessage('');

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/test-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setConnState('error');
        setConnMessage(
          (data && (data.message as string)) || `Request failed (${res.status})`
        );
        return;
      }

      setConnState('connected');
      setConnMessage((data && (data.message as string)) || 'Connected');
    } catch (e: any) {
      setConnState('error');
      setConnMessage(e?.name === 'AbortError' ? 'Timed out' : 'Failed to connect');
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  const statusText =
    connState === 'connected'
      ? 'Connected'
      : connState === 'connecting'
        ? 'Connecting...'
        : connState === 'error'
          ? 'Error'
          : 'Disconnected';

  const statusColor =
    connState === 'connected'
      ? 'text-green-400'
      : connState === 'connecting'
        ? 'text-yellow-300'
        : connState === 'error'
          ? 'text-red-400'
          : 'text-gray-400';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-zinc-900">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex text-white mb-8">
        <p>Open World MMO - Dev Build v0.1</p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          Status: <span className={`${statusColor} ml-2`}>{statusText}</span>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <GameCanvas />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mt-10">
        <button
          onClick={handleTestLogin}
          disabled={connState === 'connecting'}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <h2 className="mb-3 text-2xl font-semibold text-white">Test Login</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50 text-gray-400">
            Connect to Java Backend
          </p>
          {connMessage ? (
            <p className="mt-3 text-xs text-gray-300 break-words">{connMessage}</p>
          ) : null}
        </button>
      </div>
    </main>
  );
}
