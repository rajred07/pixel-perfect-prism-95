// import React from 'react';
// import { NavigationItem } from './NavigationItem';
// import { Lock } from 'lucide-react';

// interface Movie {
//   id: string;
//   title: string;
//   japaneseTitle?: string;
//   year?: string;
//   episodes?: string;
//   genres?: string;
//   genre?: string[];
//   popularity?: string;
//   synopsis?: string;
//   score?: string;
// }

// interface SidebarProps {
//   onCategorySelect?: (category: string) => void;
//   selectedCategory?: string;
//   movies?: Movie[];
//   selectedMovie?: string | null;
//   onMovieSelect?: (movie: Movie) => void;
//   currentCategoryLabel?: string;
//   loading?: boolean;
//   error?: string | null;
// }

// export const Sidebar: React.FC<SidebarProps> = ({
//   onCategorySelect,
//   selectedCategory,
//   movies = [],
//   selectedMovie,
//   onMovieSelect,
//   currentCategoryLabel,
//   loading = false,
//   error = null,
// }) => {
//   const navigationItems = [
//     {
//       id: 'new-chat',
//       icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px]">
//         <g clip-path="url(#clip0_2507_557)">
//           <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 3H4.5C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3V3ZM17.25 12.75H12.75V17.25C12.75 17.6642 12.4142 18 12 18C11.5858 18 11.25 17.6642 11.25 17.25V12.75H6.75C6.33579 12.75 6 12.4142 6 12C6 11.5858 6.33579 11.25 6.75 11.25H11.25V6.75C11.25 6.33579 11.5858 6 12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H17.25C17.6642 11.25 18 11.5858 18 12C18 12.4142 17.6642 12.75 17.25 12.75V12.75Z" fill="currentColor"></path>
//         </g>
//         <defs>
//           <clipPath id="clip0_2507_557">
//             <rect width="24" height="24" fill="white"></rect>
//           </clipPath>
//         </defs>
//       </svg>`,
//       label: 'New Chat'
//     }
//   ];

//   const settingsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px]">
//     <g clip-path="url(#clip0_2507_593)">
//       <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.4974 9.51579 14.4842 7.50258 12 7.5V7.5ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15V15ZM20.25 12.2025C20.2537 12.0675 20.2537 11.9325 20.25 11.7975L21.6488 10.05C21.7975 9.86393 21.849 9.61827 21.7875 9.38813C21.5582 8.52619 21.2152 7.69861 20.7675 6.92719C20.6486 6.72249 20.4401 6.58592 20.205 6.55875L17.9813 6.31125C17.8888 6.21375 17.795 6.12 17.7 6.03L17.4375 3.80063C17.4101 3.56531 17.2732 3.35677 17.0681 3.23813C16.2964 2.79126 15.4689 2.44859 14.6072 2.21906C14.3769 2.15784 14.1312 2.20969 13.9453 2.35875L12.2025 3.75C12.0675 3.75 11.9325 3.75 11.7975 3.75L10.05 2.35406C9.86393 2.20533 9.61827 2.15383 9.38813 2.21531C8.52633 2.44503 7.6988 2.78802 6.92719 3.23531C6.72249 3.35417 6.58592 3.56268 6.55875 3.79781L6.31125 6.02531C6.21375 6.11844 6.12 6.21219 6.03 6.30656L3.80063 6.5625C3.56531 6.58988 3.35677 6.72682 3.23813 6.93188C2.79126 7.70359 2.44859 8.5311 2.21906 9.39281C2.15784 9.6231 2.20969 9.86878 2.35875 10.0547L3.75 11.7975C3.75 11.9325 3.75 12.0675 3.75 12.2025L2.35406 13.95C2.20533 14.1361 2.15383 14.3817 2.21531 14.6119C2.44462 15.4738 2.78763 16.3014 3.23531 17.0728C3.35417 17.2775 3.56268 17.4141 3.79781 17.4412L6.02156 17.6887C6.11469 17.7862 6.20844 17.88 6.30281 17.97L6.5625 20.1994C6.58988 20.4347 6.72682 20.6432 6.93188 20.7619C7.70359 21.2087 8.5311 21.5514 9.39281 21.7809C9.6231 21.8422 9.86878 21.7903 10.0547 21.6413L11.7975 20.25C11.9325 20.2537 12.0675 20.2537 12.2025 20.25L13.95 21.6488C14.1361 21.7975 14.3817 21.849 14.6119 21.7875C15.4738 21.5582 16.3014 21.2152 17.0728 20.7675C17.2775 20.6486 17.4141 20.4401 17.4412 20.205L17.6887 17.9813C17.7862 17.8888 17.88 17.795 17.97 17.7L20.1994 17.4375C20.4347 17.4101 20.6432 17.2732 20.7619 17.0681C21.2087 16.2964 21.5514 15.4689 21.7809 14.6072C21.8422 14.3769 21.7903 14.1312 21.6413 13.9453L20.25 12.2025ZM18.7406 11.5931C18.7566 11.8641 18.7566 12.1359 18.7406 12.4069C18.7295 12.5924 18.7876 12.7755 18.9037 12.9206L20.2341 14.5828C20.0814 15.0679 19.886 15.5385 19.65 15.9891L17.5312 16.2291C17.3467 16.2495 17.1764 16.3377 17.0531 16.4766C16.8727 16.6795 16.6805 16.8717 16.4775 17.0522C16.3387 17.1754 16.2505 17.3458 16.23 17.5303L15.9947 19.6472C15.5442 19.8833 15.0736 20.0787 14.5884 20.2313L12.9253 18.9009C12.7922 18.7946 12.6269 18.7367 12.4566 18.7369H12.4116C12.1405 18.7528 11.8688 18.7528 11.5978 18.7369C11.4123 18.7257 11.2292 18.7838 11.0841 18.9L9.41719 20.2313C8.93206 20.0786 8.46146 19.8831 8.01094 19.6472L7.77094 17.5312C7.75046 17.3467 7.66227 17.1764 7.52344 17.0531C7.32048 16.8727 7.12827 16.6805 6.94781 16.4775C6.82456 16.3387 6.6542 16.2505 6.46969 16.23L4.35281 15.9937C4.11674 15.5433 3.92128 15.0727 3.76875 14.5875L5.09906 12.9244C5.21522 12.7793 5.27336 12.5962 5.26219 12.4106C5.24625 12.1396 5.24625 11.8679 5.26219 11.5969C5.27336 11.4113 5.21522 11.2282 5.09906 11.0831L3.76875 9.41719C3.9214 8.93206 4.11685 8.46146 4.35281 8.01094L6.46875 7.77094C6.65326 7.75046 6.82362 6.77227 6.94688 7.52344C7.12733 7.32048 7.31954 7.12827 7.5225 6.94781C7.66188 6.82448 7.75043 6.65373 7.77094 6.46875L8.00625 4.35281C8.45672 4.11674 8.92733 3.92128 9.4125 3.76875L11.0756 5.09906C11.2207 5.21522 11.4038 5.27336 11.5894 5.26219C11.8604 5.24625 12.1321 5.24625 12.4031 5.26219C12.5887 5.27336 12.7718 5.21522 12.9169 5.09906L14.5828 3.76875C15.0679 3.9214 15.5385 4.11685 15.9891 4.35281L16.2291 6.46875C16.2495 6.65326 16.3377 6.82362 16.4766 6.94688C16.6795 7.12733 16.8717 7.31954 17.0522 7.5225C17.1754 7.66133 17.3458 7.74952 17.5303 7.77L19.6472 8.00531C19.8833 8.45578 20.0787 8.9264 20.2313 9.41156L18.9009 11.0747C18.7837 11.221 18.7255 11.406 18.7378 11.5931H18.7406Z" fill="currentColor"></path>
//     </g>
//     <defs>
//       <clipPath id="clip0_2507_593">
//         <rect width="24" height="24" fill="white"></rect>
//       </clipPath>
//     </defs>
//   </svg>`;

//   const formatGenres = (movie: Movie): string => {
//     if (movie.genre && Array.isArray(movie.genre)) {
//       return movie.genre.slice(0, 2).join(', ');
//     }
//     if (movie.genres) {
//       return movie.genres.split(',').slice(0, 2).join(',').trim();
//     }
//     return '';
//   };

//   const handleChatHistoryClick = () => {
//     alert('Chat History will be unlocked in MovieSavy Version 2! 🎬✨');
//   };

//   return (
//     <nav className="flex flex-col w-[319px] max-md:w-full max-md:h-auto max-sm:hidden font-poppins">
//       <div className="flex min-h-[700px] flex-col bg-white dark:bg-[#171212] p-4 max-md:min-h-[auto] border-r border-gray-200 dark:border-[#362B2B]">
//         <div className="flex flex-col gap-4 flex-1">
//           <div className="text-black dark:text-white text-base font-medium leading-6">
//             Savy – Your Movie Expert 🤖🎬
//           </div>
//           <div className="flex flex-col gap-2">
//             {navigationItems.map((item) => (
//               <NavigationItem
//                 key={item.id}
//                 icon={item.icon}
//                 label={item.label}
//                 isActive={item.id === selectedCategory}
//                 onClick={() => onCategorySelect?.(item.id)}
//               />
//             ))}
            
//             <div className="relative">
//               <button
//                 onClick={handleChatHistoryClick}
//                 className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-colors bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed opacity-60"
//               >
//                 <div className="flex items-center gap-2">
//                   <div dangerouslySetInnerHTML={{ 
//                     __html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px]">
//                       <g clip-path="url(#clip0_2507_564)">
//                         <path fill-rule="evenodd" clip-rule="evenodd" d="M20.25 7.5H17.25V4.5C17.25 3.67157 16.5784 3 15.75 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V16.5C2.2509 16.7879 2.41656 17.0499 2.67629 17.1742C2.93603 17.2985 3.24398 17.2631 3.46875 17.0831L6.75 14.4375V17.25C6.75 18.0784 7.42157 18.75 8.25 18.75H17.0241L20.5312 21.5831C20.664 21.6905 20.8293 21.7493 21 21.75C21.4142 21.75 21.75 21.4142 21.75 21V9C21.75 8.17157 21.0784 7.5 20.25 7.5V7.5ZM6.23906 12.9169L3.75 14.9297V4.5H15.75V12.75H6.71063C6.53897 12.75 6.37252 12.8089 6.23906 12.9169V12.9169ZM20.25 19.4297L17.7609 17.4169C17.6282 17.3095 17.4629 17.2507 17.2922 17.25H8.25V14.25H15.75C16.5784 14.25 17.25 13.5784 17.25 12.75V9H20.25V19.4297Z" fill="currentColor"></path>
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_2507_564">
//                           <rect width="24" height="24" fill="white"></rect>
//                         </clipPath>
//                       </defs>
//                     </svg>` 
//                   }} />
//                   <Lock className="w-4 h-4" />
//                 </div>
//                 <span className="text-sm font-medium">Chat History</span>
//               </button>
//             </div>
//           </div>

//           {currentCategoryLabel && (
//             <div className="flex flex-col gap-2 mt-4">
//               <div className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-5 px-3">
//                 {currentCategoryLabel} Movies
//               </div>

//               {loading && (
//                 <div className="flex items-center justify-center py-4">
//                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
//                 </div>
//               )}

//               {error && (
//                 <div className="px-3 py-2 text-red-500 dark:text-red-400 text-sm">
//                   Failed to load movies. Please try again.
//                 </div>
//               )}

//               {!loading && !error && movies.length === 0 && (
//                 <div className="px-3 py-2 text-gray-500 dark:text-gray-500 text-sm">
//                   No movies found in this category.
//                 </div>
//               )}

//               {!loading && !error && movies.length > 0 && (
//                 <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
//                   {movies.map((movie) => (
//                     <button
//                       key={movie.id}
//                       onClick={() => onMovieSelect?.(movie)}
//                       className={`flex flex-col items-start gap-1 px-3 py-2 rounded-xl w-full text-left transition-colors ${
//                         selectedMovie === movie.title
//                           ? 'bg-purple-500 text-white dark:bg-purple-600 dark:text-white'
//                           : 'bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 dark:hover:text-white'
//                       }`}
//                     >
//                       <div className="text-sm font-medium truncate w-full">{movie.title}</div>
//                       <div className="flex items-center justify-between w-full text-xs opacity-75">
//                         <span className="truncate flex-1 mr-2">{formatGenres(movie)}</span>
//                         {movie.score && (
//                           <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded text-xs font-medium">
//                             ⭐ {movie.score}
//                           </span>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col gap-1 mt-4">
//           <NavigationItem
//             icon={settingsIcon}
//             label="Settings"
//             isActive={selectedCategory === 'settings'}
//             onClick={() => onCategorySelect?.('settings')}
//           />
//         </div>
//       </div>
//     </nav>
//   );
// };




// changes for backend integration

import React from 'react';
import { NavigationItem } from './NavigationItem';
import { Lock } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  japaneseTitle?: string;
  year?: string;
  episodes?: string;
  genres?: string;
  genre?: string[];
  popularity?: string;
  synopsis?: string;
  score?: string;
}

interface SidebarProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
  movies?: Movie[];
  selectedMovie?: string | null;
  onMovieSelect?: (movieTitle: string) => void; // Changed to accept a string (movie title)
  currentCategoryLabel?: string;
  loading?: boolean;
  error?: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onCategorySelect,
  selectedCategory,
  movies = [],
  selectedMovie,
  onMovieSelect,
  currentCategoryLabel,
  loading = false,
  error = null,
}) => {
  const navigationItems = [
    {
      id: 'new-chat',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px]">
        <g clip-path="url(#clip0_2507_557)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 3H4.5C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3V3ZM17.25 12.75H12.75V17.25C12.75 17.6642 12.4142 18 12 18C11.5858 18 11.25 17.6642 11.25 17.25V12.75H6.75C6.33579 12.75 6 12.4142 6 12C6 11.5858 6.33579 11.25 6.75 11.25H11.25V6.75C11.25 6.33579 11.5858 6 12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H17.25C17.6642 11.25 18 11.5858 18 12C18 12.4142 17.6642 12.75 17.25 12.75V12.75Z" fill="currentColor"></path>
        </g>
        <defs>
          <clipPath id="clip0_2507_557">
            <rect width="24" height="24" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>`,
      label: 'New Chat'
    }
  ];

  const settingsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px]">
    <g clip-path="url(#clip0_2507_593)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.4974 9.51579 14.4842 7.50258 12 7.5V7.5ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15V15ZM20.25 12.2025C20.2537 12.0675 20.2537 11.9325 20.25 11.7975L21.6488 10.05C21.7975 9.86393 21.849 9.61827 21.7875 9.38813C21.5582 8.52619 21.2152 7.69861 20.7675 6.92719C20.6486 6.72249 20.4401 6.58592 20.205 6.55875L17.9813 6.31125C17.8888 6.21375 17.795 6.12 17.7 6.03L17.4375 3.80063C17.4101 3.56531 17.2732 3.35677 17.0681 3.23813C16.2964 2.79126 15.4689 2.44859 14.6072 2.21906C14.3769 2.15784 14.1312 2.20969 13.9453 2.35875L12.2025 3.75C12.0675 3.75 11.9325 3.75 11.7975 3.75L10.05 2.35406C9.86393 2.20533 9.61827 2.15383 9.38813 2.21531C8.52633 2.44503 7.6988 2.78802 6.92719 3.23531C6.72249 3.35417 6.58592 3.56268 6.55875 3.79781L6.31125 6.02531C6.21375 6.11844 6.12 6.21219 6.03 6.30656L3.80063 6.5625C3.56531 6.58988 3.35677 6.72682 3.23813 6.93188C2.79126 7.70359 2.44859 8.5311 2.21906 9.39281C2.15784 9.6231 2.20969 9.86878 2.35875 10.0547L3.75 11.7975C3.75 11.9325 3.75 12.0675 3.75 12.2025L2.35406 13.95C2.20533 14.1361 2.15383 14.3817 2.21531 14.6119C2.44462 15.4738 2.78763 16.3014 3.23531 17.0728C3.35417 17.2775 3.56268 17.4141 3.79781 17.4412L6.02156 17.6887C6.11469 17.7862 6.20844 17.88 6.30281 17.97L6.5625 20.1994C6.58988 20.4347 6.72682 20.6432 6.93188 20.7619C7.70359 21.2087 8.5311 21.5514 9.39281 21.7809C9.6231 21.8422 9.86878 21.7903 10.0547 21.6413L11.7975 20.25C11.9325 20.2537 12.0675 20.2537 12.2025 20.25L13.95 21.6488C14.1361 21.7975 14.3817 21.849 14.6119 21.7875C15.4738 21.5582 16.3014 21.2152 17.0728 20.7675C17.2775 20.6486 17.4141 20.4401 17.4412 20.205L17.6887 17.9813C17.7862 17.8888 17.88 17.795 17.97 17.7L20.1994 17.4375C20.4347 17.4101 20.6432 17.2732 20.7619 17.0681C21.2087 16.2964 21.5514 15.4689 21.7809 14.6072C21.8422 14.3769 21.7903 14.1312 21.6413 13.9453L20.25 12.2025ZM18.7406 11.5931C18.7566 11.8641 18.7566 12.1359 18.7406 12.4069C18.7295 12.5924 18.7876 12.7755 18.9037 12.9206L20.2341 14.5828C20.0814 15.0679 19.886 15.5385 19.65 15.9891L17.5312 16.2291C17.3467 16.2495 17.1764 16.3377 17.0531 16.4766C16.8727 16.6795 16.6805 16.8717 16.4775 17.0522C16.3387 17.1754 16.2505 17.3458 16.23 17.5303L15.9947 19.6472C15.5442 19.8833 15.0736 20.0787 14.5884 20.2313L12.9253 18.9009C12.7922 18.7946 12.6269 18.7367 12.4566 18.7369H12.4116C12.1405 18.7528 11.8688 18.7528 11.5978 18.7369C11.4123 18.7257 11.2292 18.7838 11.0841 18.9L9.41719 20.2313C8.93206 20.0786 8.46146 19.8831 8.01094 19.6472L7.77094 17.5312C7.75046 17.3467 7.66227 17.1764 7.52344 17.0531C7.32048 16.8727 7.12827 16.6805 6.94781 16.4775C6.82456 16.3387 6.6542 16.2505 6.46969 16.23L4.35281 15.9937C4.11674 15.5433 3.92128 15.0727 3.76875 14.5875L5.09906 12.9244C5.21522 12.7793 5.27336 12.5962 5.26219 12.4106C5.24625 12.1396 5.24625 11.8679 5.26219 11.5969C5.27336 11.4113 5.21522 11.2282 5.09906 11.0831L3.76875 9.41719C3.9214 8.93206 4.11685 8.46146 4.35281 8.01094L6.46875 7.77094C6.65326 7.75046 6.82362 6.77227 6.94688 7.52344C7.12733 7.32048 7.31954 7.12827 7.5225 6.94781C7.66188 6.82448 7.75043 6.65373 7.77094 6.46875L8.00625 4.35281C8.45672 4.11674 8.92733 3.92128 9.4125 3.76875L11.0756 5.09906C11.2207 5.21522 11.4038 5.27336 11.5894 5.26219C11.8604 5.24625 12.1321 5.24625 12.4031 5.26219C12.5887 5.27336 12.7718 5.21522 12.9169 5.09906L14.5828 3.76875C15.0679 3.9214 15.5385 4.11685 15.9891 4.35281L16.2291 6.46875C16.2495 6.65326 16.3377 6.82362 16.4766 6.94688C16.6795 7.12733 16.8717 7.31954 17.0522 7.5225C17.1754 7.66133 17.3458 7.74952 17ய.5303 7.77L19.6472 8.00531C19.8833 8.45578 20.0787 8.9264 20.2313 9.41156L18.9009 11.0747C18.7837 11.221 18.7255 11.406 18.7378 11.5931H18.7406Z" fill="currentColor"></path>
    </g>
    <defs>
      <clipPath id="clip0_2507_593">
        <rect width="24" height="24" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>`;

  const formatGenres = (movie: Movie): string => {
    if (movie.genre && Array.isArray(movie.genre)) {
      return movie.genre.slice(0, 2).join(', ');
    }
    if (movie.genres) {
      return movie.genres.split(',').slice(0, 2).join(',').trim();
    }
    return '';
  };

  const handleChatHistoryClick = () => {
    alert('Chat History will be unlocked in MovieSavy Version 2! 🎬✨');
  };

  return (
    <nav className="flex flex-col w-[319px] max-md:w-full max-md:h-auto max-sm:hidden font-poppins">
      <div className="flex min-h-[700px] flex-col bg-white dark:bg-[#171212] p-4 max-md:min-h-[auto] border-r border-gray-200 dark:border-[#362B2B]">
        <div className="flex flex-col gap-4 flex-1">
          <div className="text-black dark:text-white text-base font-medium leading-6">
            Savy – Your Movie Expert 🤖🎬
          </div>
          <div className="flex flex-col gap-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={item.id === selectedCategory}
                onClick={() => onCategorySelect?.(item.id)}
              />
            ))}
            
            <div className="relative">
              <button
                onClick={handleChatHistoryClick}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-colors bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed opacity-60"
              >
                <div className="flex items-center gap-2">
                  <div dangerouslySetInnerHTML={{ 
                    __html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px]">
                      <g clip-path="url(#clip0_2507_564)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.25 7.5H17.25V4.5C17.25 3.67157 16.5784 3 15.75 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V16.5C2.2509 16.7879 2.41656 17.0499 2.67629 17.1742C2.93603 17.2985 3.24398 17.2631 3.46875 17.0831L6.75 14.4375V17.25C6.75 18.0784 7.42157 18.75 8.25 18.75H17.0241L20.5312 21.5831C20.664 21.6905 20.8293 21.7493 21 21.75C21.4142 21.75 21.75 21.4142 21.75 21V9C21.75 8.17157 21.0784 7.5 20.25 7.5V7.5ZM6.23906 12.9169L3.75 14.9297V4.5H15.75V12.75H6.71063C6.53897 12.75 6.37252 12.8089 6.23906 12.9169V12.9169ZM20.25 19.4297L17.7609 17.4169C17.6282 17.3095 17.4629 17.2507 17.2922 17.25H8.25V14.25H15.75C16.5784 14.25 17.25 13.5784 17.25 12.75V9H20.25V19.4297Z" fill="currentColor"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_2507_564">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>` 
                  }} />
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Chat History</span>
              </button>
            </div>
          </div>

          {currentCategoryLabel && (
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-5 px-3">
                {currentCategoryLabel} Section 
              </div>

              {loading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                </div>
              )}

              {error && (
                <div className="px-3 py-2 text-red-500 dark:text-red-400 text-sm">
                  Failed to load movies. Please try again.
                </div>
              )}

              {!loading && !error && movies.length === 0 && (
                <div className="px-3 py-2 text-gray-500 dark:text-gray-500 text-sm">
                  No movies found in this category.
                </div>
              )}

              {!loading && !error && movies.length > 0 && (
                <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                  {movies.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => onMovieSelect?.(movie.title)} // Changed to pass movie.title instead of the entire movie object
                      className={`flex flex-col items-start gap-1 px-3 py-2 rounded-xl w-full text-left transition-colors ${
                        selectedMovie === movie.title
                          ? 'bg-purple-500 text-white dark:bg-purple-600 dark:text-white'
                          : 'bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 dark:hover:text-white'
                      }`}
                    >
                      <div className="text-sm font-medium truncate w-full">{movie.title}</div>
                      <div className="flex items-center justify-between w-full text-xs opacity-75">
                        <span className="truncate flex-1 mr-2">{formatGenres(movie)}</span>
                        {movie.score && (
                          <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded text-xs font-medium">
                            ⭐ {movie.score}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <NavigationItem
            icon={settingsIcon}
            label="Settings"
            isActive={selectedCategory === 'settings'}
            onClick={() => onCategorySelect?.('settings')}
          />
        </div>
      </div>
    </nav>
  );
};