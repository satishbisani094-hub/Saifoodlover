import React, { useState } from "react";
import { CustomerReview } from "../types";
import { Star, MessageSquareCode, Check } from "lucide-react";

interface ReviewSectionProps {
  reviews: CustomerReview[];
  setReviews: React.Dispatch<React.SetStateAction<CustomerReview[]>>;
}

export default function ReviewSection({ reviews, setReviews }: ReviewSectionProps) {
  
  // Submit review states
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please share your name.");
      return;
    }
    if (!comment.trim()) {
      setErrorMessage("Please type a short message about your meal experience.");
      return;
    }

    const newReview: CustomerReview = {
      id: `review_${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0]
    };

    setReviews(prev => [newReview, ...prev]);
    
    // Reset form states
    setName("");
    setComment("");
    setRating(5);
    setErrorMessage("");
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-20 bg-[#0a0a0c] border-t border-[#ffd700]/10 scroll-mt-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs text-[#f57c00] uppercase font-mono tracking-widest block mb-2">🎈 Good Food, Good Mood</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Customer Testimonials</h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent w-44 mx-auto mt-3" />
          <p className="text-xs text-gray-400 mt-3 font-serif">
            Read stories of sweet treats and spicy savory bites from foodies who love Saifoodlover Cafe.
          </p>
        </div>

        {/* Dynamic Split block: Read Reviews + Submit Review */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Reviews List (Left side, takes 2/3 space) */}
          <div className="lg:col-span-2 space-y-4 max-h-[550px] overflow-y-auto pr-2">
            {reviews.map((r) => (
              <div 
                key={r.id} 
                className="bg-[#111115] border border-gray-850 p-5 rounded-2xl flex flex-col justify-between hover:border-[#f57c00]/20 transition-all opacity-100"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{r.name}</h4>
                      <span className="text-[10px] text-gray-500 font-mono">{r.date || "Recent order"}</span>
                    </div>

                    {/* Star Row */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-3.5 h-3.5 ${
                            idx < r.rating 
                              ? "fill-[#ffd700] text-[#ffd700]" 
                              : "text-gray-750"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 italic font-serif leading-relaxed mt-3">
                    &ldquo; {r.comment} &rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Review Form (Right Side, takes 1/3 space) */}
          <div className="bg-[#111115] border border-[#ffd700]/15 p-6 rounded-2xl h-fit">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              💌 Share Your Experience
            </h3>

            {isSuccess ? (
              <div className="py-8 text-center space-y-3 bg-green-500/5 rounded-xl border border-green-500/20 p-4">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold text-white">Review Posted!</h5>
                <p className="text-[11px] text-gray-400 font-serif leading-relaxed">
                  Thank you for your rating! Your review is now live on the public rating wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                {/* Star Picker input */}
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Your Star Rating</label>
                  <div className="flex items-center gap-1 bg-[#1e1e24] p-2 rounded-lg border border-gray-800 w-fit">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        id={`review-picker-${s}`}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 focus:outline-none focus:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-5 h-5 transition-colors ${
                            s <= (hoverRating ?? rating) 
                              ? "fill-[#ffd700] text-[#ffd700]" 
                              : "text-gray-600"
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-gray-400 ml-2 font-mono">{rating} / 5</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Your Nickname</label>
                  <input
                    id="user-review-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Satish Bysani"
                    className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2.5 text-white outline-none"
                    required
                  />
                </div>

                {/* Message comments */}
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Brief Testimonial Comment</label>
                  <textarea
                    id="user-review-comment-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you ordered and how the taste was!"
                    rows={4}
                    className="w-full bg-[#1e1e24] border border-gray-700 focus:border-[#f57c00] rounded-lg p-2.5 text-white outline-none resize-none font-serif"
                    required
                  />
                </div>

                {errorMessage && (
                  <p className="text-[11px] text-red-400 font-medium">{errorMessage}</p>
                )}

                <button
                  id="user-review-submit-btn"
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#f57c00] to-orange-500 font-semibold text-white uppercase rounded-lg tracking-wider hover:brightness-110 active:scale-95 transition-all text-xs flex items-center justify-center gap-2"
                >
                  <MessageSquareCode className="w-4 h-4" />
                  Post Review
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
