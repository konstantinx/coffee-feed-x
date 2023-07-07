import React from 'react';
import { Coffee } from '../types/coffee';
import Image from './image';

const colors: string[] = [
  '#34ce95',
  '#00FF00',
  '#5555c7',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#008000',
  '#808000',
  'rgba(189,139,189,0.94)',
  '#008080',
  '#808080',
  '#FF4500',
  '#e83b5f',
  '#FFD700',
  '#FFA500',
  '#FF69B4',
  '#FFC0CB',
  '#EE82EE',
  '#00FF7F',
  '#6A5ACD',
  '#7FFF00',
  '#32CD32',
  '#FF6347',
  '#2E8B57',
  '#A0522D',
  '#F08080',
  '#F4A460',
  '#d0cb88',
];
const getColor = (tag: string) => {
  let hash = 0,
    i,
    chr;
  if (tag.length === 0) return hash;
  for (i = 0; i < tag.length; i++) {
    chr = tag.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  const index = hash & colors.length;
  return colors[index === colors.length ? index - 1 : index];
};

const Card: React.FC<Coffee> = ({
  imageUrl,
  intensifier,
  blendName,
  variety,
  notes,
  origin,
}) => {
  return (
    <div className="card">
      <div className="card__intensifier">{intensifier}</div>
      <Image src={imageUrl} alt={blendName} />
      <div className="card__origin">{origin}</div>
      <div className="card__blend-name">{blendName}</div>
      <div className="card__variety">{variety}</div>

      <div className="card__tags">
        {notes.map((note, index) => (
          <div
            style={{ background: getColor(note) }}
            className="card__tag"
            key={index}
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
