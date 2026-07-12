// Avatar helpers.
// profile_image can hold either an uploaded image URL, or an emoji stored as "emoji:😀".

export const EMOJI_PREFIX = "emoji:";

export function getAvatarEmoji(user) {
  const val = user?.profile_image || "";
  return val.startsWith(EMOJI_PREFIX) ? val.slice(EMOJI_PREFIX.length) : null;
}

export function getAvatarImageUrl(user) {
  const val = user?.profile_image || user?.brand_logo || "";
  if (!val || val.startsWith(EMOJI_PREFIX)) return null;
  return val;
}