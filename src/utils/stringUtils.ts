/**
 * Kullanıcı adının baş harflerini büyük yapar
 * @param username - Kullanıcı adı
 * @returns Baş harfleri büyük kullanıcı adı
 */
export const capitalizeUsername = (username: string): string => {
  if (!username) return '';
  
  return username
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * İlk kelimenin ilk harfini büyük yapar
 * @param text - Metin
 * @returns İlk harfi büyük metin
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
