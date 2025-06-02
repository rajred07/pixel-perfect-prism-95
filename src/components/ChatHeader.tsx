
import React from 'react';

interface ChatHeaderProps {
  selectedMovie?: string | null;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedMovie
}) => {
  const sunIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-1">
    <g clip-path="url(#clip0_2507_622)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.375 3.125V1.25C9.375 0.904822 9.65482 0.625 10 0.625C10.3452 0.625 10.625 0.904822 10.625 1.25V3.125C10.625 3.47018 10.3452 3.75 10 3.75C9.65482 3.75 9.375 3.47018 9.375 3.125V3.125ZM15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C12.7602 5.00301 14.997 7.23983 15 10V10ZM13.75 10C13.75 7.92893 12.0711 6.25 10 6.25C7.92893 6.25 6.25 7.92893 6.25 10C6.25 12.0711 7.92893 13.75 10 13.75C12.0702 13.7478 13.7478 12.0702 13.75 10V10ZM4.55781 5.44219C4.80203 5.6864 5.19797 5.6864 5.44219 5.44219C5.6864 5.19797 5.6864 4.80203 5.44219 4.55781L4.19219 3.30781C3.94797 3.0636 3.55203 3.0636 3.30781 3.30781C3.0636 3.55203 3.0636 3.94797 3.30781 4.19219L4.55781 5.44219ZM4.55781 14.5578L3.30781 15.8078C3.14983 15.9658 3.08814 16.196 3.14596 16.4119C3.20378 16.6277 3.37235 16.7962 3.58815 16.854C3.80395 16.9119 4.03421 16.8502 4.19219 16.6922L5.44219 15.4422C5.60017 15.2842 5.66186 15.054 5.60404 14.8381C5.54622 14.6223 5.37765 14.4538 5.16185 14.396C4.94605 14.3381 4.71579 14.3998 4.55781 14.5578V14.5578ZM15 5.625C15.1658 5.62513 15.3249 5.55937 15.4422 5.44219L16.6922 4.19219C16.8502 4.03421 16.9119 3.80395 16.854 3.58815C16.7962 3.37235 16.6277 3.20378 16.4119 3.14596C16.196 3.08814 15.9658 3.14983 15.8078 3.30781L14.5578 4.55781C14.3789 4.73657 14.3253 5.00557 14.4221 5.23924C14.5189 5.47292 14.7471 5.6252 15 5.625V5.625ZM15.4422 14.5578C15.198 14.3136 14.802 14.3136 14.5578 14.5578C14.3136 14.802 14.3136 15.198 14.5578 15.4422L15.8078 16.6922C16.052 16.9364 16.448 16.9364 16.6922 16.6922C16.9364 16.448 16.9364 16.052 16.6922 15.8078L15.4422 14.5578ZM3.75 10C3.75 9.65482 3.47018 9.375 3.125 9.375H1.25C0.904822 9.375 0.625 9.65482 0.625 10C0.625 10.3452 0.904822 10.625 1.25 10.625H3.125C3.47018 10.625 3.75 10.3452 3.75 10V10ZM10 16.25C9.65482 16.25 9.375 16.5298 9.375 16.875V18.75C9.375 19.0952 9.65482 19.375 10 19.375C10.3452 19.375 10.625 19.0952 10.625 18.75V16.875C10.625 16.5298 10.3452 16.25 10 16.25V16.25ZM18.75 9.375H16.875C16.5298 9.375 16.25 9.65482 16.25 10C16.25 10.3452 16.5298 10.625 16.875 10.625H18.75C19.0952 10.625 19.375 10.3452 19.375 10C19.375 9.65482 19.0952 9.375 18.75 9.375V9.375Z" fill="white"></path>
    </g>
    <defs>
      <clipPath id="clip0_2507_622">
        <rect width="20" height="20" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>`;

  const moonIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-1">
    <g clip-path="url(#clip0_2507_627)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2453 11.1117C18.0819 10.948 17.8415 10.8879 17.6203 10.9555C15.1921 11.6895 12.557 11.0282 10.7632 9.23442C8.9695 7.44068 8.30811 4.80554 9.04219 2.37734C9.11033 2.15605 9.05054 1.91521 8.8868 1.75148C8.72307 1.58774 8.48224 1.52795 8.26094 1.59609C6.6133 2.10082 5.16683 3.11234 4.12734 4.48672C2.27317 6.94845 1.97139 10.2473 3.34813 13.0046C4.72487 15.7619 7.54311 17.5029 10.625 17.5C12.3878 17.5054 14.1036 16.9324 15.5094 15.8687C16.8838 14.8293 17.8953 13.3828 18.4 11.7352C18.4673 11.5147 18.4079 11.2751 18.2453 11.1117V11.1117ZM14.7578 14.8703C12.0208 16.9319 8.18347 16.6632 5.76042 14.2403C3.33737 11.8175 3.06837 7.98019 5.12969 5.24297C5.77922 4.3852 6.61896 3.68988 7.58281 3.21172C7.5279 3.59705 7.50023 3.98578 7.5 4.375C7.50474 8.86035 11.1396 12.4953 15.625 12.5C16.015 12.4999 16.4045 12.4722 16.7906 12.4172C16.312 13.3812 15.6161 14.221 14.7578 14.8703V14.8703Z" fill="white"></path>
    </g>
    <defs>
      <clipPath id="clip0_2507_627">
        <rect width="20" height="20" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>`;

  return (
    <div className="flex justify-between items-center border px-10 py-3 border-[#E5E8EB] max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-3">
      <div className="flex items-center gap-4">
        <div className="flex flex-col" />
        <h1 className="text-white text-lg font-bold leading-[23px] h-[23px]">
          Movie Chatbot
        </h1>
      </div>
      <div className="flex justify-end items-center gap-8 flex-1 max-md:gap-4">
        {selectedMovie && (
          <div className="flex h-8 justify-center items-center gap-2 bg-[#362B2B] px-4 py-0 rounded-xl max-sm:px-3 max-sm:py-0">
            <span className="text-white text-sm font-medium leading-[21px] flex-1 max-sm:text-xs">
              🎬 Currently Selected Movie: {selectedMovie}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button 
            className="flex h-10 justify-center items-center gap-2 bg-[#362B2B] px-2.5 py-0 rounded-xl hover:bg-[#362B2B]/80 transition-colors"
            aria-label="Toggle light mode"
          >
            <div className="flex flex-col items-center flex-1">
              <div dangerouslySetInnerHTML={{ __html: sunIcon }} />
            </div>
          </button>
          <button 
            className="flex h-10 justify-center items-center gap-2 bg-[#362B2B] px-2.5 py-0 rounded-xl hover:bg-[#362B2B]/80 transition-colors"
            aria-label="Toggle dark mode"
          >
            <div className="flex flex-col items-center flex-1">
              <div dangerouslySetInnerHTML={{ __html: moonIcon }} />
            </div>
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          alt="User profile"
          className="w-[40px] h-[40px] rounded-[20px]"
        />
      </div>
    </div>
  );
};
