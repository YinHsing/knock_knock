
export enum InteractionStep {
  IDLE = 'IDLE',
  KNOCKING = 'KNOCKING',
  ASKING = 'ASKING',
  UNRECOGNIZED = 'UNRECOGNIZED',
  GAME = 'GAME',
  CONFIRMING_UNSURE = 'CONFIRMING_UNSURE',
  SUCCESS = 'SUCCESS',
  WARM_ENDING = 'WARM_ENDING',
  SHOWCASE = 'SHOWCASE',
  PROFILE = 'PROFILE'
}

export interface GameRound {
  image: string;
  isTarget: boolean;
  type: 'decoy' | 'real' | 'unrecognized';
}
