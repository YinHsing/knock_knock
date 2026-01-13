
export const USER_PROFILES: Record<string, string> = {
  aya: "",
  corann: "",
  jack: "", // bartender
  // jack: "", // PM
  jeremy: "",
  josh: "",
  lee: "sincere, action-oriented and easy to talk to. You say what you mean, you don't make excuses, and when something matters to you, you just go for it. You clearly love chatting with people - I can't really imagine you just sitting somewhere quietly by yourself for long ",
  liam: "logical, easygoing and confident. I still remember the first time we met. You showed us your new magic trick, then somehow we started talking about games—and suddenly you pulled a chess set out of your bag. From then on, every Sunday became our board game night. Even though it was a short time, I really enjoyed playing with you. So much laughter at Whisky Dan.",
  ling: "",
  matt: "",
  Pascow: "",
  yina: ""
};

export const INITIAL_NAMES = Object.keys(USER_PROFILES);

export const DECOY_SEEDS = ['duck', 'emu', 'fairywren', 'koala', 'rhino'];

export const getImagePath = (name: string, type: 'real' | 'decoy' | 'unrecognized' = 'real') => {
  const basePath = '/knock_knock/images';
  if (type === 'unrecognized') {
    return `${basePath}/unrecognized.jpg`;
  }
  if (type === 'decoy') {
    return `${basePath}/decoy/${name}.jpg`;
  }
  return `${basePath}/real/${name.replace(/\s+/g, '').toLowerCase()}.jpg`;
};
