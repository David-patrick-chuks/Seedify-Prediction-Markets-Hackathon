import { startCase, toLower } from 'lodash';


export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const stringToTitleCase = (value: string): string => {
  if (typeof value !== 'string') return '';

  return startCase(toLower(value));
};

export const textToCamelCase = (text: string): string => {
  return text
    .trim()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }

      return capitalizeFirstLetter(word);
    })
    .join('');
};

export const inputOnlyNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.trim() === '') {
    e.target.value = '';
    return;
  }

  const val = Number(e.target.value);
  if (!Number(val) || val <= 0) e.target.value = '1';
};

export function capitalize(s: string): string {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const toFixedNumber = (value: number, precision: number): number => {
  return parseFloat(value.toFixed(precision));
};

export const applyEllipseInCenter = (text: string): string => {
  if (!text || text.trim().length === 0) return text;

  return text.replace(text.slice(4, text.length - 4), '...');
};

export const toLocalCurrency = (
  value?: number | null,
  currency?: string | null,
  locale?: string,
  minimumFractionDigits = 0
): string => {
  if(!value) return '';

  currency = currency || 'USD';

  return value.toLocaleString(locale || 'en-US', {
    style: "currency",
    currency,
    minimumFractionDigits,
  });
};