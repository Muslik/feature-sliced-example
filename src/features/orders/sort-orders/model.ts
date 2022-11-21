import { createEvent, sample } from 'effector';

import { SortParams } from 'src/entities/orders';
import { sortQueryApplied } from 'src/entities/orders';

export const sortApplied = createEvent<SortParams>();

sample({
  clock: sortApplied,
  target: sortQueryApplied,
});
