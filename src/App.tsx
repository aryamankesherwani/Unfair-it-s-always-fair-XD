/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import standaloneHtml from './game.html?raw';

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleOpenNewTab = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fefce8] text-[#713f12] flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 font-sans">
      {/* Top Header */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-3 bg-[#fef9c3] border-2 border-[#e4b103] rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-black shadow text-sm">
            UP
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#422006]">
              Unfair Platformer <span className="text-xs bg-[#e4b103] text-[#422006] px-2 py-0.5 rounded-full font-bold">20 LEVELS</span>
            </h1>
            <p className="text-xs text-[#854d0e] font-semibold">
              Charcoal Grey Menu & Game GIF Loop &bull; 20 Unfair Levels &bull; Troll Voice
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleOpenNewTab}
            id="open-tab-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white rounded-lg text-xs font-bold transition shadow-sm"
            title="Open game in clean new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open New Tab</span>
          </button>
        </div>
      </header>

      {/* Main Game Frame Container */}
      <main className="w-full max-w-5xl flex flex-col items-center">
        <div className="w-full bg-[#fef9c3] border-2 border-[#e4b103] rounded-2xl overflow-hidden shadow-lg p-1.5">
          <iframe
            ref={iframeRef}
            srcDoc={standaloneHtml}
            title="Unfair Platformer Standalone Game"
            scrolling="no"
            className="w-full h-[530px] sm:h-[590px] md:h-[630px] border-0 rounded-xl bg-[#0f172a] overflow-hidden select-none"
            sandbox="allow-scripts allow-same-origin allow-modals"
            allow="autoplay; microphone"
          />
        </div>
      </main>
    </div>
  );
}

export const STANDALONE_HTML_CODE = standaloneHtml;
