
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Door from './components/Door';
import SpeechBubble from './components/SpeechBubble';
import Onomatopoeia from './components/Onomatopoeia';
import GardenBed from './components/GardenBed';
import Cloud from './components/cloud';
import { InteractionStep, GameRound } from './types';
import { INITIAL_NAMES, getImagePath, DECOY_SEEDS, USER_PROFILES } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<InteractionStep>(InteractionStep.IDLE);
  const [nameInput, setNameInput] = useState('');
  const [message, setMessage] = useState("Who's there?");
  const [knocks, setKnocks] = useState<{ id: number }[]>([]);
  
  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [initialMappingFailCount, setInitialMappingFailCount] = useState(0);
  const [isShutterForceClosed, setIsShutterForceClosed] = useState(false);
  const [isComingFromProfile, setIsComingFromProfile] = useState(false);

  const handleDoorClick = () => {
    if (step !== InteractionStep.IDLE) return;
    const newKnock = { id: Date.now() };
    setKnocks([newKnock]);
    setStep(InteractionStep.KNOCKING);
    setTimeout(() => {
      setStep(InteractionStep.ASKING);
      setMessage("Who's there?");
    }, 800);
  };

  const removeKnock = (id: number) => {
    setKnocks(prev => prev.filter(k => k.id !== id));
  };

  const handleVerifyName = () => {
    const processedName = nameInput.trim().toLowerCase();
    if (!processedName) return;
    const isMatched = INITIAL_NAMES.includes(processedName);
    if (isMatched) {
      setInitialMappingFailCount(0);
      setupGame(processedName);
    } else {
      const nextFailCount = initialMappingFailCount + 1;
      setInitialMappingFailCount(nextFailCount);
      setStep(InteractionStep.UNRECOGNIZED);
      if (nextFailCount >= 2) {
        setMessage("Please contact Yina!!!");
      } else {
        setMessage("Hmm... this door doesn't seem to recognize you.");
      }
    }
  };

  const setupGame = (targetName: string) => {
    let gameRounds: GameRound[] = [];
    const decoys = [...DECOY_SEEDS].sort(() => 0.5 - Math.random());
    const targetRoundIdx = Math.floor(Math.random() * 3);
    for (let i = 0; i < 3; i++) {
      if (i === targetRoundIdx) {
        gameRounds.push({ image: targetName, isTarget: true, type: 'real' });
      } else {
        gameRounds.push({ image: decoys[i], isTarget: false, type: 'decoy' });
      }
    }
    setRounds(gameRounds);
    setCurrentRoundIdx(0);
    setMistakeCount(0);
    setStep(InteractionStep.GAME);
    setMessage(`Is this you, ${nameInput}?`);
  };

  const handleResponse = (answer: 'yes' | 'no') => {
    const currentRound = rounds[currentRoundIdx];
    const isCorrect = (answer === 'yes' && currentRound.isTarget) || (answer === 'no' && !currentRound.isTarget);
    if (!isCorrect) {
      const nextMistakeCount = mistakeCount + 1;
      setMistakeCount(nextMistakeCount);
      if (nextMistakeCount === 1) {
        setMessage("YOU sure about that?");
        setStep(InteractionStep.CONFIRMING_UNSURE);
      } else if (nextMistakeCount === 2) {
        setMessage("Wait... Seriously?");
        setStep(InteractionStep.CONFIRMING_UNSURE);
      } else {
        setStep(InteractionStep.WARM_ENDING);
        setMessage("Hi, mysterious guest!");
      }
    } else {
      setMistakeCount(0);
      if (currentRound.isTarget) {
        setStep(InteractionStep.SUCCESS);
        setMessage("I knew it was you! I've been waiting for you.");
        setTimeout(() => {
          setStep(InteractionStep.SHOWCASE);
          setTimeout(() => setStep(InteractionStep.PROFILE), 1600);
        }, 1500);
      } else {
        goToNextRound();
      }
    }
  };

  const goToNextRound = () => {
    setIsShutterForceClosed(true);
    setTimeout(() => {
      if (currentRoundIdx < 2) {
        setCurrentRoundIdx(prev => prev + 1);
        setMistakeCount(0);
        setStep(InteractionStep.GAME);
        setMessage(`Is this you, ${nameInput}?`);
        setTimeout(() => setIsShutterForceClosed(false), 300);
      }}, 600);
  };

  const reset = () => {
    setIsComingFromProfile(step === InteractionStep.PROFILE);
    setStep(InteractionStep.RESETTING);

    setTimeout(() => {
      setStep(InteractionStep.IDLE);
      setNameInput('');
      setCurrentRoundIdx(0);
      setRounds([]);
      setMistakeCount(0);
      setInitialMappingFailCount(0);
      setIsShutterForceClosed(false);
      setIsComingFromProfile(false);
      setMessage("Who's there?");
    }, 600);
    };

  const hasStarted = ![InteractionStep.IDLE, InteractionStep.KNOCKING, InteractionStep.RESETTING].includes(step);
  const isProfileActive = step === InteractionStep.PROFILE;
  const isTransitioning = step === InteractionStep.SHOWCASE;
  const isResetting = step === InteractionStep.RESETTING;

  // Get personalized message for recognized user
  const rawMessage = USER_PROFILES[nameInput.toLowerCase()];
  const personalizedMessage = `If I had to describe you in three words, they’d be ${rawMessage}` || "Welcome to the board!";
  
  return (
    <div className="relative h-[100dvh] w-full safe-layout bg-[#3bd2ea] overflow-hidden flex flex-col items-center justify-center p-[2vmin]">
      {/* Background decoration */}
      <div className="h-[20dvh] sm:h-[10dvh]" />
      <Cloud hasStarted={hasStarted} />
      <AnimatePresence>
        {(isProfileActive || (isResetting && isComingFromProfile)) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] p-4 bg-black/95 overflow-y-auto scrollbar-hide">
            <div className="min-h-full w-full flex items-center justify-center p-8 sm:p-12 my-auto">
            <motion.div 
              initial={{ scale: 0.8, y: 30 }}
              animate={isResetting ? { scale: 0, opacity: 0 } : { scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "backIn" }}
              className="relative w-full max-w-lg bg-white border-[0.8vmin] border-black p-[5vmin] hand-drawn-border shadow-[15px_15px_0px_0px_rgba(229,62,62,1)]">
              <div className="flex flex-col items-center gap-[4vmin] text-center">
                <div className="relative w-[40vmin] h-[40vmin] max-w-[200px] max-h-[200px] border-[1vmin] border-black hand-drawn-border-sm overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <img src={getImagePath(nameInput, 'real')} className="w-full h-full object-cover" alt="Profile" />
                </div>
                <h2 className="text-[5vmin] sm:text-4xl font-black italic uppercase tracking-tighter">HI, {nameInput}!</h2>
                <div className="w-full max-h-[25vh] overflow-y-auto no-scrollbar py-2">
                  <p className="text-[5.5vmin] sm:text-2xl italic text-gray-800 leading-relaxed font-bold">"{personalizedMessage}"</p>
                </div>
                <motion.button 
                  onClick={reset}
                  animate={isResetting ? { scale: 0 } : { scale: 1 }}
                  className="w-full py-[3vmin] mt-[1vmin] bg-black text-white text-[5vmin] sm:text-3xl font-black uppercase hand-drawn-border shadow-[8px_8px_0px_0px_rgba(229,62,62,1)] transition-transform"
                >
                  PLAY AGAIN
                </motion.button>
              </div>
            </motion.div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LayoutGroup>
        <div className="flex flex-col landscape:flex-row items-center justify-center w-full h-full max-w-7xl gap-[3vmin] sm:gap-[6vmin]">
          {/* Left/Top Area: Door and Speech Bubble */}
          <motion.div
            layout
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`relative flex flex-col items-center justify-center
              ${hasStarted ? 'landscape:flex-[0.5] landscape:items-end portrait:flex-shrink' : 'flex-1 items-center'}
            `}
          >
            {knocks.map(k => <Onomatopoeia key={k.id} text="knock knock!" onComplete={() => removeKnock(k.id)} />)}

            <div className={`relative flex flex-col items-center ${(isProfileActive || isResetting)  ? 'invisible' : ''}`}>
              {/* Responsive Speech Bubble Positioning */}
              <div className="absolute 
                portrait:top-[-15vmin] portrait:left-1/2 portrait:-translate-x-1/2 
                landscape:left-[105%] landscape:top-[-5vmin] z-[150]"
              >
                <SpeechBubble text={message} isVisible={hasStarted} />
              </div>

              <Door
                step={step}
                onClick={handleDoorClick}
                revealImage={step === InteractionStep.UNRECOGNIZED ? '?' : rounds[currentRoundIdx]?.image}
                revealType={step === InteractionStep.UNRECOGNIZED ? 'unrecognized' : rounds[currentRoundIdx]?.type}
                isShutterForceClosed={isShutterForceClosed}
              />

              <GardenBed isTransitioning={isTransitioning} />
            </div>
          </motion.div>

          {/* Right/Bottom Area: Input and Buttons */}
          <AnimatePresence>
            {hasStarted && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1  }}
                exit={{ opacity: 0, x: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: "backIn" }}
                className="flex flex-col items-center justify-center w-full max-w-[85vw] sm:max-w-md landscape:flex-[0.5] landscape:items-start portrait:mt-[4vmin] portrait:h-[25vh] portrait:min-h-[150px] z-40"
              >
                <div className="w-full flex flex-col gap-[3vmin]">
                  <AnimatePresence mode="wait">
                    {[InteractionStep.ASKING, InteractionStep.UNRECOGNIZED].includes(step) && (
                      <motion.div key="input-box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center gap-[3vmin]">
                        <input
                          autoFocus type="text" placeholder="WHO'S THERE?..." value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleVerifyName()}
                          className="w-full bg-transparent border-b-[0.6vmin] border-black text-[7vmin] sm:text-5xl py-2 text-center focus:outline-none italic uppercase font-black"
                        />
                        <button onClick={handleVerifyName} className="w-full py-[3vmin] bg-black text-white text-[5vmin] sm:text-3xl font-black uppercase hand-drawn-border shadow-[10px_10px_0px_0px_rgba(229,62,62,1)] active:translate-y-1 transition-all">
                          {initialMappingFailCount > 0 ? 'TRY AGAIN' : "IT'S ME!"}
                        </button>
                      </motion.div>
                    )}

                    {[InteractionStep.GAME, InteractionStep.CONFIRMING_UNSURE].includes(step) && !isShutterForceClosed && ( 
                      <motion.div 
                        key="game-ui" 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.95 }} 
                        transition={{ duration:0.5, ease:"backOut", delay: 0.3 }} 
                        className="flex gap-[3vmin] w-full">
                        <button onClick={() => handleResponse('yes')} className="flex-1 py-[3vmin] bg-green-500 text-white text-[6vmin] sm:text-4xl font-black border-[0.6vmin] border-black hand-drawn-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all uppercase">YES</button>
                        <button onClick={() => handleResponse('no')} className="flex-1 py-[3vmin] bg-red-500 text-white text-[6vmin] sm:text-4xl font-black border-[0.6vmin] border-black hand-drawn-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all uppercase">NO</button>
                      </motion.div>
                    )}

                    {step === InteractionStep.WARM_ENDING && (
                      <motion.div key="ending-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 0, opacity: 0 }}  className="w-full">
                        <button onClick={reset}
                          className="w-full py-[3vmin] bg-black text-white text-[4vmin] sm:text-3xl font-black uppercase hand-drawn-border shadow-[10px_10px_0px_0px_rgba(229,62,62,1)] active:scale-95 transition-all"
                        >RESTART</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
};

export default App;
