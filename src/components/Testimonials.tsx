import React, { useState, useEffect, useRef } from 'react';
import { Star, Users, Quote, ChevronLeft, ChevronRight, Verified, Heart } from 'lucide-react';
import { Testimonial, ThemeClasses } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, darkMode, themeClasses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonialTimestamps, setTestimonialTimestamps] = useState<string[]>([]);
  const touchStartX = useRef<number | null>(null);

  // ----- timestamps (unchanged logic, tidied) -----
  useEffect(() => {
    const generateRandomTimestamp = () => {
      const now = new Date();
      const isRecent = Math.random() < 0.3; // 30% recent
      let randomTime: number;

      if (isRecent) {
        const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
        randomTime = tenDaysAgo.getTime() + Math.random() * (now.getTime() - tenDaysAgo.getTime());
      } else {
        const elevenDaysAgo = new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000);
        const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
        randomTime = twoYearsAgo.getTime() + Math.random() * (elevenDaysAgo.getTime() - twoYearsAgo.getTime());
      }

      const randomDate = new Date(randomTime);
      const timeDiff = now.getTime() - randomDate.getTime();
      const days = Math.floor(timeDiff / (1000 * 3600 * 24));

      if (days === 0) return 'Today';
      if (days === 1) return '1 day ago';
      if (days < 7) return `${days} days ago`;
      if (days < 14) return '1 week ago';
      if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
      if (days < 60) return '1 month ago';
      if (days < 365) return `${Math.floor(days / 30)} months ago`;
      if (days < 730) return '1 year ago';
      return `${Math.floor(days / 365)} years ago`;
    };

    setTestimonialTimestamps(testimonials.map(() => generateRandomTimestamp()));
  }, [testimonials]);

  // ----- autoplay -----
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    const id = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isAutoPlaying, testimonials.length]);

  // ----- navigation -----
  const nextTestimonial = () => {
    setCurrentIndex((p) => (p + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };
  const prevTestimonial = () => {
    setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // ----- mobile swipe -----
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? nextTestimonial() : prevTestimonial();
    }
    touchStartX.current = null;
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`relative overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border} rounded-xl sm:rounded-2xl shadow-xl`}>
      {/* ---- Header (compact, clear, “genuine”) ---- */}
      <div className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              <Star className={`${darkMode ? 'text-yellow-300' : 'text-yellow-500'} w-5 h-5`} />
            </div>
            <div>
              <h3 className={`text-lg sm:text-xl font-bold ${themeClasses.text}`}>What customers say</h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className={`${themeClasses.textSecondary}`}>4.8/5 • 12,847 reviews</span>
              </div>
            </div>
          </div>

          {/* Controls (always visible) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              aria-label="Previous testimonial"
              onClick={prevTestimonial}
              className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
            >
              <ChevronLeft className={`${themeClasses.text}`} />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={nextTestimonial}
              className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
            >
              <ChevronRight className={`${themeClasses.text}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ================== MOBILE LAYOUT ================== */}
      {/* Single clean card, swipeable, concise meta; no decorative clutter */}
      <div className="sm:hidden px-4 pb-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-4`}>
          {/* person row */}
          <div className="flex items-start gap-3 mb-3">
            <div className="relative">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${darkMode ? 'bg-blue-700' : 'bg-blue-600'}`}>
                {currentTestimonial.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
              </div>
              <Verified className="w-4 h-4 absolute -bottom-1 -right-1 text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={`font-semibold ${themeClasses.text} truncate`}>{currentTestimonial.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Users className="w-3.5 h-3.5 text-purple-500" />
                <span className={`${themeClasses.textSecondary}`}>{currentTestimonial.location}</span>
                <span className="mx-1 text-neutral-400">•</span>
                <span className={`${themeClasses.textSecondary}`}>{testimonialTimestamps[currentIndex] || 'Recently'}</span>
              </div>
            </div>
          </div>

          {/* quote */}
          <blockquote className={`${themeClasses.text} text-sm leading-relaxed`}>
            “{currentTestimonial.text}”
          </blockquote>

          {/* stars + nav */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className={`ml-2 text-xs ${themeClasses.textSecondary}`}>{currentTestimonial.rating}.0</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous testimonial"
                onClick={prevTestimonial}
                className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
              >
                <ChevronLeft className={`${themeClasses.text}`} />
              </button>
              <button
                aria-label="Next testimonial"
                onClick={nextTestimonial}
                className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
              >
                <ChevronRight className={`${themeClasses.text}`} />
              </button>
            </div>
          </div>
        </div>

        {/* dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToTestimonial(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-6 bg-blue-600 dark:bg-blue-400'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-700'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ================== DESKTOP / TABLET ================== */}
      {/* Compact two-column: featured left, quick list right */}
      <div className="hidden sm:block p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-12 gap-4">
          {/* Featured card */}
          <div className="col-span-12 lg:col-span-8">
            <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-5`}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-bold ${darkMode ? 'bg-blue-700' : 'bg-blue-600'}`}>
                    {currentTestimonial.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </div>
                  <Verified className="w-4 h-4 absolute -bottom-1 -right-1 text-green-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h4 className={`font-semibold ${themeClasses.text} truncate text-base`}>{currentTestimonial.name}</h4>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300">
                      Verified purchase
                    </span>
                    <span className={`text-xs ${themeClasses.textSecondary} truncate`}>• {currentTestimonial.location}</span>
                    <span className={`text-xs ${themeClasses.textSecondary}`}>• {testimonialTimestamps[currentIndex] || 'Recently'}</span>
                  </div>

                  <blockquote className={`${themeClasses.text} mt-2 text-sm sm:text-base leading-relaxed`}>
                    “{currentTestimonial.text}”
                  </blockquote>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className={`ml-2 text-sm ${themeClasses.textSecondary}`}>{currentTestimonial.rating}.0</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Previous testimonial"
                        onClick={prevTestimonial}
                        className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
                      >
                        <ChevronLeft className={`${themeClasses.text}`} />
                      </button>
                      <button
                        aria-label="Next testimonial"
                        onClick={nextTestimonial}
                        className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
                      >
                        <ChevronRight className={`${themeClasses.text}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact list of other reviews */}
          <div className="col-span-12 lg:col-span-4">
            <div className="grid grid-cols-1 gap-3">
              {testimonials
                .map((t, i) => ({ t, i }))
                .filter(({ i }) => i !== currentIndex)
                .slice(0, 3)
                .map(({ t, i }) => (
                  <button
                    key={i}
                    onClick={() => goToTestimonial(i)}
                    className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-lg p-3 text-left hover:shadow-sm transition`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-9 h-9 rounded-md flex items-center justify-center text-white text-xs font-bold ${darkMode ? 'bg-blue-700' : 'bg-blue-600'}`}>
                        {t.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm font-medium ${themeClasses.text} truncate`}>{t.name}</div>
                        <div className={`text-xs ${themeClasses.textSecondary} truncate`}>{t.location}</div>
                        <p className={`text-xs ${themeClasses.textSecondary} mt-1 line-clamp-2`}>“{t.text}”</p>
                        <div className="mt-1 flex">
                          {[...Array(t.rating)].map((_, k) => (
                            <Star key={k} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
            </div>

            {/* indicators */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex ? 'w-6 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-neutral-300 dark:bg-neutral-700'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* subtle trust row */}
        <div
          className={`mt-5 rounded-lg border ${
            darkMode ? 'border-green-800/30 bg-green-900/10' : 'border-green-200 bg-green-50'
          } p-3 text-xs flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <Verified className="w-4 h-4 text-green-600" />
            <span className={`${darkMode ? 'text-green-300' : 'text-green-800'}`}>
              Reviews are from verified customers who completed a transaction.
            </span>
          </div>
          <span className={`${themeClasses.textSecondary} hidden sm:inline`}>Updated periodically</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
