import { useState, useRef } from 'react';
import { interviewQuestions, blitzQuestions } from '../data/content';

// ============================================
// ИНСТРУКЦИЯ: Как добавить медиафайлы
// ============================================
// 1. Аудиофайл:  public/media/interview.m4a
//    (переименуйте ваш файл "Покровский бульвар 6.m4a" в "interview.m4a")
// 2. Видеофайл:  public/media/interview-video.mp4
// 3. Файлы автоматически появятся в интерфейсе
// 
// Поддерживаемые форматы:
//   Аудио: .m4a, .mp3, .ogg, .wav
//   Видео: .mp4, .webm
// ============================================

const AUDIO_PATH = '/media/interview.m4a';
const VIDEO_PATH = '/media/interview-video.mp4';

export default function InterviewSection() {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [audioError, setAudioError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentQuestion = interviewQuestions.find(q => q.id === activeQuestion);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <section id="interview" className="relative py-20 md:py-32 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1f3c]/50 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Раздел 02</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Человек, который помогает
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              понять технологии
            </span>
          </h2>
        </div>

        {/* Interviewee info */}
        <div className="glass-panel p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-3xl md:text-4xl">👤</span>
          </div>
          
          <div className="flex-1 w-full">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Дубельщиков А. А.
            </h3>
            <p className="text-cyan-400/80 text-sm mb-4">
              Преподаватель факультета довузовской подготовки НИУ ВШЭ
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Информатика', 'IoT', 'Киберфизические системы', 'Телекоммуникации', 'Подготовка школьников'].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-300/80 border border-cyan-400/20">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Audio player */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">Аудиозапись интервью</p>
                    <p className="text-xs text-slate-500">
                      {audioError ? 'Файл не найден' : 'Запись беседы с преподавателем'}
                    </p>
                  </div>
                </div>
              </div>

              {audioError ? (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-300/80 mb-2">
                    ⚠️ Не удалось загрузить аудиофайл
                  </p>
                  <p className="text-xs text-slate-500 mb-3">
                    Проверьте, что файл <code className="text-cyan-400/60 bg-white/5 px-1 rounded">interview.m4a</code> находится в папке <code className="text-cyan-400/60 bg-white/5 px-1 rounded">public/media/</code>
                  </p>
                  <button
                    onClick={() => setAudioError(false)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/30 rounded px-1"
                  >
                    Попробовать снова
                  </button>
                </div>
              ) : (
                <audio
                  key={AUDIO_PATH}
                  controls
                  preload="metadata"
                  onError={() => setAudioError(true)}
                  className="w-full h-10 [&::-webkit-media-controls-panel]:bg-white/5"
                  style={{ width: '100%' }}
                >
                  <source src={AUDIO_PATH} type="audio/mp4" />
                  <source src={AUDIO_PATH} type="audio/x-m4a" />
                  Ваш браузер не поддерживает данный формат аудио.
                </audio>
              )}
            </div>

            {/* Video toggle */}
            <div className="mt-4">
              <button
                onClick={toggleVideo}
                className="flex items-center gap-2 text-sm text-cyan-400/70 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/30 rounded px-2 py-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {showVideo ? 'Скрыть видео' : 'Показать видео'}
              </button>

              {showVideo && (
                <div className="mt-3 rounded-xl overflow-hidden border border-white/10 animate-slide-in">
                  {videoError ? (
                    <div className="p-8 text-center bg-white/5">
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-amber-300/80 mb-1">Видеофайл не загружен</p>
                      <p className="text-xs text-slate-500">
                        Положите файл <code className="text-cyan-400/60 bg-white/5 px-1 rounded">interview-video.mp4</code> в папку <code className="text-cyan-400/60 bg-white/5 px-1 rounded">public/media/</code>
                      </p>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      controls
                      preload="metadata"
                      onError={() => setVideoError(true)}
                      className="w-full max-h-[400px] bg-black"
                      poster=""
                    >
                      <source src={VIDEO_PATH} type="video/mp4" />
                      <source src={VIDEO_PATH.replace('.mp4', '.webm')} type="video/webm" />
                      Ваш браузер не поддерживает видео.
                    </video>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline / Questions navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Questions list */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-slate-400 text-sm mb-4 font-medium">Вопросы интервью:</p>
            {interviewQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestion(q.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${
                  activeQuestion === q.id
                    ? 'glass-panel border-cyan-400/30 bg-cyan-400/5'
                    : 'hover:bg-white/5'
                }`}
                aria-pressed={activeQuestion === q.id}
              >
                <span className={`text-xs font-mono mt-0.5 ${
                  activeQuestion === q.id ? 'text-cyan-400' : 'text-slate-500'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`text-sm leading-snug ${
                  activeQuestion === q.id ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'
                }`}>
                  {q.shortTitle}
                </span>
                {activeQuestion === q.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0 mt-1.5" />
                )}
              </button>
            ))}
          </div>

          {/* Answer area */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 md:p-8 min-h-[300px] flex flex-col">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-6 leading-snug">
                {currentQuestion?.title}
              </h4>
              
              <div className="flex-1">
                <p className="text-slate-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {currentQuestion?.answer}
                </p>
              </div>

              {/* Navigation */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between">
                <button
                  onClick={() => setActiveQuestion(Math.max(1, activeQuestion - 1))}
                  disabled={activeQuestion === 1}
                  className="text-sm text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Предыдущий
                </button>
                <button
                  onClick={() => setActiveQuestion(Math.min(interviewQuestions.length, activeQuestion + 1))}
                  disabled={activeQuestion === interviewQuestions.length}
                  className="text-sm text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  Следующий
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blitz Survey */}
        <div className="mt-16 md:mt-20">
          <div className="mb-8">
            <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Блиц-опрос</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Быстрые ответы
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blitzQuestions.map((item, index) => (
              <div
                key={index}
                className="glass-panel p-5 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <p className="text-sm text-slate-400 mb-2">{item.question}</p>
                <p className="text-lg font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
