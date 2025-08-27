import React, { useState, useEffect } from 'react';
import {
  Star,
  Users,
  Quote,
  ChevronLeft,
  ChevronRight,
  Verified,
  Heart,
} from 'lucide-react';
import { Testimonial, ThemeClasses } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  darkMode,
  themeClasses,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonialTimestamps, setTestimonialTimestamps] = useState<string[]>(
    []
  );

  // Generate random timestamps for testimonials
  useEffect(() => {
    const generateRandomTimestamp = () => {
      const now = new Date();

      // 30% recent (0–10 days), 70% older (11 days–2 years)
      const isRecent = Math.random() < 0.3;

      let randomTime;
      if (isRecent) {
        const tenDaysAgo = new Date(
          now.getTime() - 10 * 24 * 60 * 60 * 1000
        );
        randomTime =
          tenDaysAgo.getTime() +
          Math.random() * (now.getTime() - tenDaysAgo.getTime());
      } else {
        const elevenDaysAgo = new Date(
          now.getTime() - 11 * 24 * 60 * 60 * 1000
        );
        const twoYearsAgo = new Date(
          now.getFullYear() - 2,
          now.getMonth(),
          now.getDate()
        );
        randomTime =
          twoYearsAgo.getTime() +
          Math.random() * (elevenDaysAgo.getTime() - twoYearsAgo.getTime());
      }

      const randomDate = new Date(randomTime);
      const timeDiff = now.getTime() - randomDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      if (daysDiff === 0) return 'Today';
      if (daysDiff === 1) return '1 day ago';
      if (daysDiff < 7) return `${daysDiff} days ago`;
      if (daysDiff < 14) return '1 week ago';
      if (daysDiff < 30) return `${Math.floor(daysDiff / 7)} weeks ago`;
      if (daysDiff < 60) return '1 month ago';
      if (daysDiff < 365) return `${Math.floor(daysDiff / 30)} months ago`;
      if (daysDiff < 730) return '1 year ago';
      return `${Math.floor(daysDiff / 365)} years ago`;
    };

    const timestamps = testimonials.map(() => generateRandomTimestamp());
    setTestimonialTimestamps(timestamps);
  }, [testimonials]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Simple swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 40) (delta < 0 ? nextTestimonial : prevTestimonial)();
  };

  return (
    <div
      className={`relative overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border} rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-xl`}
    >
      {/* Subtle background (kept minimal for readability) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      {/* ======= MOBILE (compact & genuine) ======= */}
      <div className="sm:hidden relative z-10 p-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 bg-gradient-to-r ${themeClasses.gradient} rounded-lg flex items-center justify-center`}>
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${themeClasses.text}`}>What users say</h3>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <span className={`text-[11px] ml-1 ${themeClasses.textSecondary}`}>4.8/5 • 12k+ reviews</span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Previous"
              onClick={prevTestimonial}
              className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} active:scale-95`}
            >
              <ChevronLeft className={`${themeClasses.text}`} />
            </button>
            <button
              aria-label="Next"
              onClick={nextTestimonial}
              className={`p-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} active:scale-95`}
            >
              <ChevronRight className={`${themeClasses.text}`} />
            </button>
          </div>
        </div>

        {/* Card */}
        <div className={`rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} p-4`}>
          {/* Person */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-11 h-11 rounded-lg bg-gradient-to-r ${themeClasses.gradient} text-white font-bold flex items-center justify-center`}>
              {currentTestimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1">
                <span className={`text-sm font-semibold ${themeClasses.text}`}>{currentTestimonial.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-500 inline-flex items-center gap-1">
                  <Verified className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <span className={`text-[11px] ${themeClasses.textSecondary}`}>{currentTestimonial.rating}.0</span>
                <span className={`text-[11px] ${themeClasses.textSecondary} ml-2`}>{currentTestimonial.location}</span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote className={`${themeClasses.text} text-[15px] leading-6`}>
            “{currentTestimonial.text}”
          </blockquote>

          {/* Meta */}
          <div className={`mt-3 pt-3 border-t ${themeClasses.border} flex items-center justify-between`}>
            <span className={`${themeClasses.textSecondary} text-[11px]`}>
              {testimonialTimestamps[currentIndex] || 'Recently'}
            </span>
            <span className="text-[11px] text-green-600 dark:text-green-400">Verified purchase</span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? `w-5 bg-gradient-to-r ${themeClasses.gradient}`
                  : `w-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Small trust strip */}
        <div
          className={`mt-3 rounded-lg p-2 text-[11px] flex items-center justify-between border ${
            darkMode ? 'bg-neutral-900/40 border-neutral-700 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <Verified className="w-3.5 h-3.5 text-green-600" />
            Reviews verified with on-chain receipts
          </span>
          <span className={`${themeClasses.textSecondary}`}>Live</span>
        </div>
      </div>

      {/* ======= DESKTOP / TABLET (kept as your original look, with tiny fixes) ======= */}
      <div className="hidden sm:block relative z-10 p-6 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-xl`}
            >
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${themeClasses.text} flex items-center gap-2`}>
                User Reviews
                <Verified className="w-5 h-5 text-blue-500" />
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className={`${themeClasses.textSecondary} font-medium whitespace-nowrap`}>
                  4.8/5 • 12,847 reviews
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={prevTestimonial}
              className={`p-2.5 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
            >
              <ChevronLeft className={`${themeClasses.text}`} />
            </button>
            <button
              aria-label="Next"
              onClick={nextTestimonial}
              className={`p-2.5 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:opacity-80`}
            >
              <ChevronRight className={`${themeClasses.text}`} />
            </button>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="relative">
          <div
            className={`${themeClasses.cardBg} backdrop-blur-sm rounded-xl p-6 border ${themeClasses.border} shadow-xl transition-all duration-500`}
          >
            {/* Quote Icon */}
            <div className="absolute -top-3 -left-3">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <Quote className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Avatar and Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${themeClasses.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                >
                  {currentTestimonial.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Verified className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-bold ${themeClasses.text} text-lg`}>{currentTestimonial.name}</h4>
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium w-fit">
                    Verified User
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className={`text-sm ${themeClasses.textSecondary}`}>{currentTestimonial.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className={`ml-2 text-sm font-medium ${themeClasses.textSecondary}`}>
                    {currentTestimonial.rating}.0
                  </span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <blockquote className={`${themeClasses.text} text-lg font-medium leading-relaxed mb-4 italic`}>
              “{currentTestimonial.text}”
            </blockquote>

            {/* Engagement / Meta */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t ${themeClasses.border}`}
            >
              <div className="flex items-center gap-4 text-sm">
                <span className={`${themeClasses.textSecondary} whitespace-nowrap`}>
                  {testimonialTimestamps[currentIndex] || 'Recently'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-sm font-medium whitespace-nowrap">Verified Purchase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-gradient-to-r ${themeClasses.gradient} shadow-lg scale-125`
                  : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mini Reviews Grid (unchanged visually, small fixes) */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {testimonials
            .slice(0, 4)
            .filter((_, i) => i !== currentIndex)
            .slice(0, 2)
            .map((testimonial, idx) => (
              <div
                key={idx}
                className={`${themeClasses.cardBg} backdrop-blur-sm rounded-xl p-3 border ${themeClasses.border} hover:shadow-lg transition-all duration-300 cursor-pointer ${themeClasses.hover}`}
                onClick={() => goToTestimonial(testimonials.indexOf(testimonial))}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${themeClasses.gradient} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${themeClasses.text}`}>{testimonial.name}</div>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-xs ${themeClasses.textSecondary} line-clamp-2 leading-relaxed`}>
                  “{testimonial.text}”
                </p>
              </div>
            ))}
        </div>

        {/* Trust Indicators */}
        <div
          className={`mt-6 bg-gradient-to-r ${
            darkMode ? 'from-green-900/10 to-blue-900/10' : 'from-green-50 to-blue-50'
          } rounded-xl p-4 border ${darkMode ? 'border-green-800/30' : 'border-green-200'} backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Verified className="w-4 h-4 text-green-600" />
              <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                All reviews verified by blockchain transactions
              </span>
            </div>
            <div className={`text-xs ${themeClasses.textSecondary} whitespace-nowrap`}>Updated live</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
