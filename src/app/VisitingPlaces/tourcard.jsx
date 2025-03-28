'use client';
import { useRouter } from 'next/navigation';

export default function PlaceCard({
  width = '22rem',
  imageSrc = '/images/TajMahal.jpg',
  imageWidth = 350,
  imageHeight = 200,
  imageAlt = 'Taj Mahal with reflection in water',
  badgeText = '1',
  badgeBg = '#FFEA66',
  badgeTextColor = 'black',
  title = 'Taj Mahal, Agra',
  subtitle = 'An Immortal Symbol of Love',
  description = 'Majestically located on the banks of Yamuna River, this wonder of the world was built by the Mughal Emperor Shah Jahan as a memorial for his beloved wife Mumtaz Mahal.',
  exploreText = 'EXPLORE',
  planText = 'PLAN TRIP',
  }) {

  const onExplore = () => {router.push(`/ItineraryPage`);}
 


  const router = useRouter();
  const handlePlanTrip = () => {
    const parts = title.split(',').map(part => part.trim());
    const mainPlace = parts[0];
    const city = parts[1];
    const whereTo = city;

    router.push(`/PlanTrip?whereTo=${encodeURIComponent(whereTo)}`);
  };

  return (
    <div className="card m-3 shadow rounded overflow-hidden" style={{ width }}>
      <div style={{ height: `${imageHeight}px`, width: '100%', position: 'relative' }}>
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-100 h-100 object-fit-cover"
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      {/* Flexbox magic here */}
      <div className="card-body d-flex flex-column" style={{ minHeight: '240px' }}>
        <div>
          <h5 className="card-title text-start">
            <span 
              className="badge me-2"
              style={{ backgroundColor: badgeBg, color: badgeTextColor }}
            >
              {badgeText}
            </span>
            {title}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted text-start">{subtitle}</h6>
          <p className="card-text text-start">{description}</p>
        </div>

        {/* This stays at bottom */}
        <div className="mt-auto d-flex justify-content-between gap-2">
          <div 
            className="btn btn-outline-dark w-50"
            onClick={onExplore}
          >
            {exploreText}
          </div>
          <div 
            className="btn w-50"
            style={{ backgroundColor: badgeBg, color: badgeTextColor }}
            onClick={handlePlanTrip}
          >
            {planText}
          </div>
        </div>
      </div>
    </div>
  );
};
