'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PlaceCard({
  // media
  imageSrc = '/images/TajMahal.jpg',
  imageAlt = 'Taj Mahal with reflection in water',

  // badge
  badgeText = '1',
  badgeClass = 'bg-amber-300 text-black',

  // text
  title = 'Taj Mahal, Agra',
  subtitle = 'An Immortal Symbol of Love',
  description = 'Majestically located on the banks of Yamuna River, this wonder of the world was built by the Mughal Emperor Shah Jahan as a memorial for his beloved wife Mumtaz Mahal.',

  // ctas
  exploreText = 'EXPLORE',
  planText = 'PLAN TRIP',
  ctaClass = 'bg-amber-500 text-white hover:bg-amber-600',

  // optional itinerary overrides → query params
  days,                 // number | string
  interests,            // string[] | comma-separated string
  pace,                 // string
  budget_level,         // string

  className = '',
}) {
  const router = useRouter();

  // Prefer the part after the first comma (e.g., "Taj Mahal, Agra" -> "Agra")
  const parseCityFromTitle = (t) => {
    if (!t) return '';
    const [first, ...rest] = String(t).split(',');
    return (rest.join(',') || first).trim();
  };

  // kebab-case slug for /itinerary/[city]
  const slugify = (s) =>
    String(s || '')
      .trim()
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  // build href used by <Link>
  const buildExploreHref = () => {
    const city = parseCityFromTitle(title);
    const slug = slugify(city);

    const params = new URLSearchParams();
    if (days != null && days !== '') params.set('days', String(days));
    if (Array.isArray(interests) && interests.length) {
      params.set('interests', interests.join(','));
    } else if (typeof interests === 'string' && interests.trim()) {
      params.set('interests', interests.trim());
    }
    if (pace) params.set('pace', pace);
    if (budget_level) params.set('budget_level', budget_level);

    const qs = params.toString();
    return qs ? `/itinerary/${encodeURIComponent(slug)}?${qs}` : `/itinerary/${encodeURIComponent(slug)}`;
  };

  const exploreHref = buildExploreHref();

  const handlePlanTrip = () => {
    const parts = title.split(',').map((p) => p.trim());
    const whereTo = parts[1] || parts[0];
    router.push(`/PlanTrip?whereTo=${encodeURIComponent(whereTo)}`);
  };

  return (
    <article
      className={[
        // card base
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm',
        // hover
        'transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md',
        className,
      ].join(' ')}
    >
      {/* Image with consistent aspect ratio */}
      <div className="relative w-full">
        <div className="relative w-full overflow-hidden bg-neutral-100">
          {/* 16:10 aspect to keep grid aligned */}
          <div className="aspect-[16/10] w-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Badge (pure Tailwind colors via badgeClass) */}
        <div
          className={[
            'absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow ring-1 ring-black/5',
            badgeClass,
          ].join(' ')}
        >
          {badgeText}
        </div>
      </div>

      {/* Body */}
      <div className="flex grow flex-col p-4 sm:p-5">
        <header className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug text-neutral-900">
            {title}
          </h3>
          <p className="text-sm text-neutral-600">{subtitle}</p>
        </header>

        {/* Description (3-line clamp without plugin; color via Tailwind) */}
        <p
          className="mt-2 text-sm text-neutral-700"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {/* CTAs */}
        <div className="mt-4 flex gap-3">
          <Link
            href={exploreHref}
            aria-label={`Explore itinerary for ${title}`}
            className="
              inline-flex w-1/2 items-center justify-center rounded-xl border border-neutral-300
              bg-white px-3 py-2 text-sm font-semibold text-neutral-900
              hover:border-neutral-400 hover:bg-neutral-50
              focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
              transition
            "
          >
            {exploreText}
          </Link>

          <button
            type="button"
            onClick={handlePlanTrip}
            aria-label={`Plan trip to ${title}`}
            className={[
              'inline-flex w-1/2 items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold',
              'transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
              ctaClass, // e.g., 'bg-amber-500 text-white hover:bg-amber-600'
            ].join(' ')}
          >
            {planText}
          </button>
        </div>
      </div>
    </article>
  );
}
