import React, { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchPhotos, selectPhotos, PhotoData } from "./photoSlice";

export const Photos: React.FC = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);

  const handleClick = useCallback(() => {
    dispatch(fetchPhotos()).catch((error) => error.message);
  }, [dispatch]);

  return (
    <div>
      <button onClick={handleClick}>GET</button>
      {photos.status === "succeeded" && (
        <ul>
          {photos.data.map((element: PhotoData) => (
            <li key={element.id}>
              <img src={element.url} alt={element.title} />
            </li>
          ))}
        </ul>
      )}
      {photos.status === "pending" && <div>Loading...</div>}
      {photos.status === "failed" && <div>{photos.error}</div>}
    </div>
  );
};
