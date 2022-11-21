import { sample } from 'effector';
import { fetchOrdersFx } from 'src/entities/orders';
import { routes } from 'src/shared/routes';

sample({
  source: routes.orders.opened,
  target: fetchOrdersFx,
});
