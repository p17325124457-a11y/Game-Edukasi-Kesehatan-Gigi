import React, { useState } from 'react';
import { ENCYCLOPEDIA_SECTIONS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import { ArrowLeft, BookOpen, CheckCircle, Info } from 'lucide-react';

interface EncyclopediaProps {
  onBack: () => void;
}

export const Encyclopedia: React.FC<EncyclopediaProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  const currentSection = ENCYCLOPEDIA_SECTIONS[activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playPop();
              onBack();
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 font-heading flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-sky-600" />
              <span>Ensiklopedia Gigi Sehat</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Panduan lengkap anatomi gigi, mitos vs fakta, dan tips perawatan klinis terpercaya.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {ENCYCLOPEDIA_SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => {
              soundManager.playPop();
              setActiveTab(idx);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === idx
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{sec.icon}</span>
            <span>{sec.title}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 font-heading">
            {currentSection.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {currentSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSection.items.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-sky-900 font-heading flex items-center gap-1.5 mb-1.5">
                  <Info className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{item.part}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-sky-100 text-[11px] text-emerald-800 flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Tips Dokter:</strong> {item.tip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
