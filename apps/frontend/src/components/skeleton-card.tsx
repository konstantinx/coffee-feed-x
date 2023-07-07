import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCard = () => (
  <ContentLoader
    speed={2}
    width={350}
    height={489}
    viewBox="0 0 350 489"
    backgroundColor="#bfbfbf"
    foregroundColor="#919191"
    className="card__skeleton"
  >
    <rect x="2" y="0" rx="0" ry="0" width="350" height="350" />
    <rect x="0" y="416" rx="0" ry="0" width="298" height="15" />
    <rect x="0" y="390" rx="0" ry="0" width="317" height="15" />
    <rect x="0" y="364" rx="0" ry="0" width="306" height="15" />
    <rect x="0" y="452" rx="5" ry="5" width="67" height="25" />
    <rect x="78" y="452" rx="5" ry="5" width="96" height="25" />
    <rect x="194" y="452" rx="5" ry="5" width="44" height="25" />
    <rect x="258" y="452" rx="5" ry="5" width="41" height="25" />
  </ContentLoader>
);

export default SkeletonCard;
