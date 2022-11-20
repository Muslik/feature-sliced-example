import { createEvent, sample } from "effector";

import { SortParams } from "src/entities/orders";
import { sortParamsApplied } from "src/entities/orders";

export const sortApplied = createEvent<SortParams>();

sample({
  clock: sortApplied,
  target: sortParamsApplied
})
