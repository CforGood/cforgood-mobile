/* @flow */

import React from 'react';
import { Platform } from 'react-native';

import createNavigator from 'react-navigation/src/navigators/createNavigator';
import createNavigationContainer from 'react-navigation/src/createNavigationContainer';
import TabRouter from 'react-navigation/src/routers/TabRouter';
import TabView from './TabView';

import type { TabViewConfig } from './TabView';

import type {
  NavigationContainerConfig,
  NavigationRouteConfigMap,
  NavigationTabRouterConfig,
} from 'react-navigation/src/TypeDefinition';

export type TabNavigatorConfig =
  & NavigationTabRouterConfig
  & TabViewConfig
  & NavigationContainerConfig;

const TabNavigator = (
  routeConfigs: NavigationRouteConfigMap,
  config: TabNavigatorConfig = {}
) => {
  // Use the look native to the platform by default
  const mergedConfig = { ...TabNavigator.Presets.Default, ...config };
  const {
    containerOptions,
    tabBarComponent,
    tabBarPosition,
    tabBarOptions,
    swipeEnabled,
    animationEnabled,
    lazyLoad,
    ...tabsConfig
  } = mergedConfig;
  const router = TabRouter(routeConfigs, tabsConfig);
  return createNavigationContainer(createNavigator(router)((props: *) =>
    <TabView
      {...props}
      tabBarComponent={tabBarComponent}
      tabBarPosition={tabBarPosition}
      tabBarOptions={tabBarOptions}
      swipeEnabled={swipeEnabled}
      animationEnabled={animationEnabled}
      lazyLoad={lazyLoad}
    />
  ), containerOptions);
};

const Presets = {
  iOSBottomTabs: {
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: false,
  },
  AndroidTopTabs: {
    tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazyLoad: false,
  },
};

TabNavigator.Presets = {
  iOSBottomTabs: Presets.iOSBottomTabs,
  AndroidTopTabs: Presets.AndroidTopTabs,
  Default: Platform.OS === 'ios' ? Presets.iOSBottomTabs : Presets.AndroidTopTabs,
};

export default TabNavigator;