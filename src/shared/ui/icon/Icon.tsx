import { ReactComponent as IconAbort } from 'src/shared/assets/abort.svg';
import { ReactComponent as IconBin } from 'src/shared/assets/bin.svg';
import { ReactComponent as IconCheckmark } from 'src/shared/assets/checkmark.svg';
import { ReactComponent as IconDot } from 'src/shared/assets/dot.svg';
import { ReactComponent as IconFilter } from 'src/shared/assets/filter.svg';
import { ReactComponent as IconLocked } from 'src/shared/assets/locked.svg';
import { ReactComponent as IconMoon } from 'src/shared/assets/moon.svg';
import { ReactComponent as IconPencil } from 'src/shared/assets/pencil.svg';
import { ReactComponent as IconRefresh } from 'src/shared/assets/refresh.svg';
import { ReactComponent as IconSearch } from 'src/shared/assets/search.svg';
import { ReactComponent as IconSun } from 'src/shared/assets/sun.svg';
import { ReactComponent as IconVarrow } from 'src/shared/assets/v_arrow.svg';
import { ReactComponent as IconXlarge } from 'src/shared/assets/x-large.svg';
import { ReactComponent as IconXmedium } from 'src/shared/assets/x-medium.svg';

const ICON_MAP = {
  abort: IconAbort,
  bin: IconBin,
  checkmark: IconCheckmark,
  dot: IconDot,
  filter: IconFilter,
  locked: IconLocked,
  moon: IconMoon,
  pencil: IconPencil,
  refresh: IconRefresh,
  search: IconSearch,
  sun: IconSun,
  varrow: IconVarrow,
  xlarge: IconXlarge,
  xmedium: IconXmedium,
};

export type IconName = keyof typeof ICON_MAP;

type Props = {
  name: IconName;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export const Icon = ({ name, width = 16, height = 16, ...props }: Props) => {
  const IconComponent = ICON_MAP[name];
  return <IconComponent width={width} height={height} {...props} />;
}
