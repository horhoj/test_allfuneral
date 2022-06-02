import { FC } from 'react';
import { nanoid } from 'nanoid';
import { OrganizationItem } from '../../../../types/organizations';
import { FileInput } from '../../../../UIKit/FileInput';
import styles from './OrganizationItemImageList.module.scss';
import { Card } from './Card';

interface OrganizationItemImageListProps {
  organizationItem: OrganizationItem;
  onDelete: (imageName: string) => void;
  onAddImage: (file: File) => void;
}

export const OrganizationItemImageList: FC<OrganizationItemImageListProps> = ({
  organizationItem,
  onDelete,
  onAddImage,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.internalWrap}>
        <div className={styles.commonTitle}>ПРИЛОЖЕННЫЕ ФОТО</div>
        <div className={styles.imageList}>
          {organizationItem.photos.map((photoItem) => (
            <Card key={nanoid()} photoItem={photoItem} onDelete={onDelete} />
          ))}
        </div>
        <div className={styles.buttonListWrap}>
          <FileInput
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onAddImage(e.target.files[0]);
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
