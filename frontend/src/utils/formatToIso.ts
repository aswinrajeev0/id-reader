export const formatToISO = (dateStr: string): string => {

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

  const [day, month, year] = dateStr.split(/[\/\-]/);
  return `${year}-${month}-${day}`;
};
