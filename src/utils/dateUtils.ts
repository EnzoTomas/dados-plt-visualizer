
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatToDMY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getYesterday = (): Date => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday;
};

export const createSafeDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`);
};
