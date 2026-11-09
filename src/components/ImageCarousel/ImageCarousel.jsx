import "./ImageCarousel.css";

function ImageSet({ images, duplicate = false }) {
  return (
    <div className="image-carousel-set" aria-hidden={duplicate || undefined}>
      {images.map((image, index) => (
        <div className="image-carousel-item" key={`${image.src}-${index}`}>
          <img
            src={image.src}
            alt={duplicate ? "" : image.alt}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default function ImageCarousel({ images }) {
  const reverseImages = [...images].reverse();

  return (
    <section className="image-carousel" aria-label="INTAMBWE project imagery">
      <div className="image-carousel-row image-carousel-row--right">
        <div className="image-carousel-track">
          <ImageSet images={images} />
          <ImageSet images={images} duplicate />
        </div>
      </div>
      <div className="image-carousel-row image-carousel-row--left">
        <div className="image-carousel-track">
          <ImageSet images={reverseImages} />
          <ImageSet images={reverseImages} duplicate />
        </div>
      </div>
    </section>
  );
}
