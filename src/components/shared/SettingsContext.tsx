import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultSettings, type SiteSettings } from '../../data/mockData';
import { dataService } from '../../services/dataService';

const SettingsContext = createContext<SiteSettings>(defaultSettings);

/** Loads school-wide details (contact info, principal, ticker…) once for the whole site. */
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
