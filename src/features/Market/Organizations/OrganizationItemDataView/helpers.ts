import { OrganizationItemType } from '../../../../types/organizations';

export const dateFormat = (date: string): string =>
  new Date(date).toLocaleDateString();

export const getOrganizationType = (data: OrganizationItemType[]): string => {
  const ms: string[] = [];

  if (data.includes('agent')) {
    ms.push('Агент');
  }

  if (data.includes('contractor')) {
    ms.push('Подрядчик');
  }

  return ms.join(', ');
};
