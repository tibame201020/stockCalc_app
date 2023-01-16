import { Bar } from './alink';

export const SEARCH_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'Summary',
      link: '/search/summary',
      icon: 'tune',
    },
    {
      name: 'price',
      link: '/search/price',
      icon: 'attach_money',
    },
    {
      name: 'financial',
      link: '/search/financial',
      icon: 'wysiwyg',
    },
  ],
};

export const STRATEGY_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'Summary',
      link: '/strategy/summary',
      icon: 'tune',
    },
    {
      name: 'backtesting',
      link: '/strategy/backtesting',
      icon: 'query_stats',
    },
  ],
};
