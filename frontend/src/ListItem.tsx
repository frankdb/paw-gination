import React, { useState } from 'react';

interface ListItemProps {
  breed: string;
  image: string | null;
  idx: number;
}

export const ListItem: React.FC<ListItemProps> = ({ breed, image, idx }) => {
  const [useDefaultImage, setUseDefaultImage] = useState(!image);

  const handleImageError = () => {
    setUseDefaultImage(true);
  };

  return (
    <div className="flex flex-row items-center justify-between p-4 m-2 border-2 rounded-md w-80">
      <img
        src={useDefaultImage ? './dog.png' : image || './dog.png'}
        alt={breed}
        className="object-cover w-24 h-24 rounded-md"
        onError={handleImageError}
      />
      <div className="ml-4 text-lg font-semibold">
        {breed || 'Unknown Breed'}
      </div>
      <div className="ml-4 text-lg font-semibold">{idx + 1}</div>
    </div>
  );
};
