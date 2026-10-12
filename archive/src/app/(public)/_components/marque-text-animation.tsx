import React from 'react';

const MarqueeItem = () => (
  <>
    {Array.from({ length: 4 }).map((_, i) => (
      <React.Fragment key={i}>
        <span className="text-center italic font-bold text-4xl md:text-6xl uppercase text-transparent text-webkit">
          Hacktoberfest 2025
        </span>
        <span className="w-[68px] h-[12px] bg-square-box-gradient"></span>
      </React.Fragment>
    ))}
  </>
);

export function MarqueTextAnimation() {
  return (
    <div className="w-full overflow-hidden pb-8">
      <div className="flex animate-marquee mb-4 sm:mb-8">
        <div className="flex gap-10 items-center whitespace-nowrap">
          <MarqueeItem />
        </div>
        <div className="flex gap-10 items-center whitespace-nowrap">
          <MarqueeItem />
        </div>
      </div>
      <div className="flex animate-marquee-reverse">
        <div className="flex gap-10 items-center whitespace-nowrap">
          <MarqueeItem />
        </div>
        <div className="flex gap-10 items-center whitespace-nowrap">
          <MarqueeItem />
        </div>
      </div>
    </div>
  );
}
