import { imagesUrl } from "./constants";
export const getMedia = ({ image, index, onPreview, data, autoPlay }) => {
  if (image.indexOf(".mp4") > -1) {
    return (
      <video
        key={index}
        style={{ width: "100%" }}
        autoPlay={autoPlay}
        onClick={() => onPreview && onPreview(data)}
      >
        <source src={`${imagesUrl}/${image}`} type="video/mp4" />
        <source src={`${imagesUrl}/${image}`} type="video/ogg" />
        Your browser does not support HTML video.
      </video>
    );
  }
  return (
    <img
      key={index}
      src={`${imagesUrl}/${image}`}
      alt={image}
      onClick={() => onPreview && onPreview(data)}
    />
  );
};
