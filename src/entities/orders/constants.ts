import { Loyality, Status } from 'src/shared/api';

export const STATUSES_MAP: Record<Status, string> = {
  new: 'Новый',
  calculation: 'Расчет',
  confirmed: 'Подтвержден',
  postponed: 'Отложен',
  completed: 'Выполнен',
  declined: 'Отменен',
};

export const LOYALITY_MAP: Record<Loyality, string> = {
  newbie: 'Новичок',
  amateur: 'Любитель',
  professional: 'Профессионал',
  legend: 'Легенда',
};
