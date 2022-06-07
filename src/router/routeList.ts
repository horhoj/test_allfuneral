import { FC } from 'react';
import { P404Page } from '../pages/P404Page';
import { UiKitPreview } from '../features/UIKitPreview';
import { HomePage } from '../pages/HomePage';
import { MarketPage } from '../pages/MarketPage';
import { SearchPage } from '../pages/SearchPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ChatPage } from '../pages/ChatPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = [
  'HomePage',
  'MarketPage',
  'SearchPage',
  'SettingsPage',
  'ChatPage',
  'UIKitPreviewPage',
  'Page404',
] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  HomePage: {
    path: '/home',
    component: HomePage,
  },

  MarketPage: {
    path: '/market',
    component: MarketPage,
  },

  SearchPage: {
    path: 'search',
    component: SearchPage,
  },

  SettingsPage: {
    path: '/settings',
    component: SettingsPage,
  },

  ChatPage: {
    path: '/chat',
    component: ChatPage,
  },

  UIKitPreviewPage: {
    path: '/ui-kit-preview',
    component: UiKitPreview,
  },

  Page404: {
    path: '*',
    component: P404Page,
  },
};
