
export const USER_PROFILES: Record<string, string> = {
  aya: ``,
  ben:``,
  corann: `open to learning,`,
  ethan:``,
  jake: `positive, kind and easygoing`, // bartender

  jack: `clear-headed`, // PM

  jeremy: `warm, caring and`,
  josh: `sociable, charming and`,

  joseph: `trustworthy, well-organised, and someone who genuinely cares about your employees. 
          I haven't spent much time with you at Whisky Den, but I've gotten to know you through other guys.
          When they talk about you, I can tell they see you not just as a boss, but more like an older brother or a friend - and they really respect you. 
          You've built a team that's not only good at doing things right, but also cares about doing the right thing.You're a great leader, and very likely a great boss boss.
          I'm really glad Vincent had the chance to work with you - thanks for appreciating what he does. 
          He's definitely learning a lot from this experience`,
  
  lee: `sincere, action-oriented and easy to talk to. 
        You say what you mean, you don't make excuses, and when something matters to you, you just go for it. 
        You clearly love chatting with people - I can't really imagine you just sitting somewhere quietly by yourself for long `,
  
  liam: `logical, easygoing and confident. 
        I still remember the first time we met. You showed us your new magic trick, then somehow we started talking about games—and suddenly you pulled a chess set out of your bag. 
        From then on, every Sunday became our board game night. 
        Even though it was a short time, I really enjoyed playing with you. So much laughter at Whisky Dan.`,
  
  ling: ``,
  matt: `reliable, genuine, `,
  noel: `well-organized, gives practical advice and genuinely friendly. Thanks so much for everything at Nextlink. 
        I'm really glad to be your colleague. Wish the best for you`,
  pascal: ``,
  yina: ``
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
  return `${basePath}/real/${name.trim().toLowerCase()}.jpg`;
};
