import { format as formatLib } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function format<DateType extends Date>(
  date: DateType | number | string,
  formatStr: string,
) {
  return formatLib(date, formatStr, {
    locale: ru,
  });
}
