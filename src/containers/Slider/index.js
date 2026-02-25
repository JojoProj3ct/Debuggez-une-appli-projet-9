import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateAsc = data?.focus.sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  useEffect(() => {
    const timer =
      byDateAsc && byDateAsc.length > 0
        ? setTimeout(() => setIndex((index + 1) % byDateAsc.length), 5000)
        : null;

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [index, byDateAsc]);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc?.map((event, idx) => (
            <input
              key={event.title} // ou event.id si tu as ajouté un id unique
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => setIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Slider;
