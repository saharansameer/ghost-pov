import { nanoid } from "nanoid";

export const getRandomGhostTag = () => {
  const ghostTags = [
    "PhantomWhisper", "SilentShade", "WraithWalker", "EchoSoul", 
    "CrypticFog", "MidnightDrift", "HauntPulse", "NocturneGlimmer", 
    "FlickerVeil", "SpecterTrace", "VoidEcho", "AshGaze", "GloomTide", 
    "PaleDrifter", "CloakRipple", "Duskwalker", "VanishingFlicker", 
    "ShadowByte", "MistPhantom",
  ];

  const slug = nanoid(5);
  const randomNum = Math.floor(Math.random() * 19);
  const tag = ghostTags[randomNum] + "-" + slug
  return tag
}

export const getRandomGhostAvatar = () => {
  const avatarNum = Math.floor(Math.random() * 18)
  const avatarUrl = `${process.env.NEXT_PUBLIC_AVATAR_URL}/ghsavt-${avatarNum}.jpg`
  return avatarUrl
}