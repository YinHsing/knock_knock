
export const USER_PROFILES: Record<string, string> = {
  matt: "Matt, thanks for always being the voice of reason! You're a true friend.",
  liam: "Liam, your creative spark keeps this team going! Glad you're here.",
  yina: "Yina, the mastermind who brought this mystery to life! Thank you."
};

export const INITIAL_NAMES = Object.keys(USER_PROFILES);

export const DECOY_SEEDS = ['funny1', 'creature', 'dog', 'cat', 'alien', 'monster', 'ghost', 'robot'];

export const getImagePath = (name: string, type: 'real' | 'decoy' | 'unrecognized' = 'real') => {
  if (type === 'unrecognized') {
    // 黑底問號圖片
    return `https://api.dicebear.com/7.x/initials/svg?seed=?&backgroundColor=000000&fontFamily=Courier&fontSize=100`;
  }
  if (type === 'decoy') {
    return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${name}`;
  }
  // 模擬真實照片
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.toLowerCase()}`;
};
