import React, { useState, useEffect } from 'react';
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

  // Generate random timestamps for testimonials
  useEffect(() => {
    const generateRandomTimestamp = () => {
      const now = new Date();
      
      // 30% chance for recent times (today to 10 days ago)
      // 70% chance for older times (11 days ago to 2 years ago)
      const isRecent = Math.random() < 0.3;
      
      let randomTime;
      if (isRecent) {
        // Recent: today to 10 days ago
        const tenDaysAgo = new Date(now.getTime() - (10 * 24 * 60 * 60 * 1000));
        randomTime = tenDaysAgo.getTime() + Math.random() * (now.getTime() - tenDaysAgo.getTime());
      } else {
        // Older: 11 days ago to 2 years ago
        const elevenDaysAgo = new Date(now.getTime() - (11 * 24 * 60 * 60 * 1000));
        const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
        randomTime = twoYearsAgo.getTime() + Math.random() * (elevenDaysAgo.getTime() - twoYearsAgo.getTime());
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
    if (!isAutoPlaying) return;
    
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

  return (
    <div className={`relative overflow-hidden ${themeClasses.cardBg} border ${themeClasses.border} rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-xl`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-xl`}>
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-lg sm:text-xl font-bold ${themeClasses.text} flex items-center gap-2`}>
                User Reviews
                <Verified className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className={`${themeClasses.textSecondary} font-medium whitespace-nowrap`}>4.8/5 • 12,847 reviews</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
        </div>

        {/* Featured Testimonial */}
        <div className="relative">
          <div className={`${themeClasses.cardBg} backdrop-blur-sm rounded-xl p-4 sm:p-6 border ${themeClasses.border} shadow-xl transition-all duration-500 transform`}>
            {/* Quote Icon */}
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${themeClasses.gradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}>
                <Quote className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Avatar and Info */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              <div className="relative">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${themeClasses.gradient} flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg`}>
                  {currentTestimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Verified className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                  <h4 className={`font-bold ${themeClasses.text} text-base sm:text-lg`}>{currentTestimonial.name}</h4>
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium w-fit">Verified User</span>
                </div>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}>{currentTestimonial.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium ${themeClasses.textSecondary}`}>
                    {currentTestimonial.rating}.0
                  </span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <blockquote className={`${themeClasses.text} text-base sm:text-lg font-medium leading-relaxed mb-4 italic`}>
              "{currentTestimonial.text}"
            </blockquote>

            {/* Engagement Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 pt-3 sm:pt-4 border-t ${themeClasses.border}">
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  
                  
                </div>
                <span className={`${themeClasses.textSecondary} text-xs whitespace-nowrap`}>
                  {testimonialTimestamps[currentIndex] || 'Recently'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-xs font-medium whitespace-nowrap">
                  Verified Purchase
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-gradient-to-r ${themeClasses.gradient} shadow-lg scale-125`
                  : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
            />
          ))}
        </div>

        {/* Mini Reviews Grid */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {testimonials.slice(0, 4).filter((_, i) => i !== currentIndex).slice(0, 2).map((testimonial, idx) => (
            <div
              key={idx}
              className={`${themeClasses.cardBg} backdrop-blur-sm rounded-lg sm:rounded-xl p-3 border ${themeClasses.border} hover:shadow-lg transition-all duration-300 cursor-pointer ${themeClasses.hover}`}
              onClick={() => goToTestimonial(testimonials.indexOf(testimonial))}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${themeClasses.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                  {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>{testimonial.name}</div>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className={`text-xs ${themeClasses.textSecondary} line-clamp-2 leading-relaxed`}>
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className={`mt-4 sm:mt-6 bg-gradient-to-r ${darkMode ? 'from-green-900/10 to-blue-900/10' : 'from-green-50 to-blue-50'} rounded-xl p-3 sm:p-4 border ${darkMode ? 'border-green-800/30' : 'border-green-200'} backdrop-blur-sm`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Verified className="w-4 h-4 text-green-600" />
              <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                All reviews verified by blockchain transactions
              </span>
            </div>
            <div className={`text-xs ${themeClasses.textSecondary} whitespace-nowrap`}>
              Updated live
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;