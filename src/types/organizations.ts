export interface PhotoItem {
  name: string;
  filepath: string;
  thumbpath: string;
}

export type OrganizationItemType = 'agent' | 'contractor';

export interface OrganizationItem {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: OrganizationItemType[];
  status: string;
  photos: PhotoItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationItemContactItem {
  id: string;
  lastname: string;
  firstname: string;
  patronymic: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
