'use client';

import { useState } from 'react';

// 설문조사 데이터 타입 정의
interface SurveyData {
  // 매장 기본정보
  storeName: string;
  storeType: string;
  businessArea: string;
  storeSize: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  
  // 네이버 플레이스 마케팅 현황
  naverPlace: {
    attractivePhotos: string;
    reservationFeature: string;
    regularNews: string;
    detailedDirections: string;
    freeMarketingMessage: string;
    seoOptimization: string;
    clipVideo: string;
    statisticsAnalysis: string;
  };
  
  // 인스타그램 마케팅 현황
  instagram: {
    searchableContent: string;
    videoCount: string;
    reviews: string;
  };
  
  // 체험단/블로그 마케팅 현황
  blogMarketing: {
    latestContent: string;
    detailedInfo: string;
  };
  
  // 구글 마케팅 현황
  google: {
    accurateInfo: string;
  };
  
  // 유료 광고 현황
  paidAds: {
    naverPlaceAds: string;
    naverPlaceAdsBudget: string;
    naverPowerlink: string;
    naverPowerlinkBudget: string;
    instagramReels: string;
    instagramReelsBudget: string;
  };
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    storeName: '',
    storeType: '',
    businessArea: '',
    storeSize: '',
    ownerName: '',
    phoneNumber: '',
    email: '',
    naverPlace: {
      attractivePhotos: '',
      reservationFeature: '',
      regularNews: '',
      detailedDirections: '',
      freeMarketingMessage: '',
      seoOptimization: '',
      clipVideo: '',
      statisticsAnalysis: '',
    },
    instagram: {
      searchableContent: '',
      videoCount: '',
      reviews: '',
    },
    blogMarketing: {
      latestContent: '',
      detailedInfo: '',
    },
    google: {
      accurateInfo: '',
    },
    paidAds: {
      naverPlaceAds: '',
      naverPlaceAdsBudget: '',
      naverPowerlink: '',
      naverPowerlinkBudget: '',
      instagramReels: '',
      instagramReelsBudget: '',
    },
  });

  const steps = [
    '매장 기본정보',
    '네이버 플레이스 마케팅',
    '인스타그램 마케팅',
    '블로그 마케팅',
    '구글 마케팅',
    '유료 광고 현황',
    '설문 완료'
  ];

  const handleInputChange = (section: keyof SurveyData, field: string, value: string) => {
    if (typeof surveyData[section] === 'object' && surveyData[section] !== null) {
      setSurveyData(prev => ({
        ...prev,
        [section]: {
          ...prev[section] as object,
          [field]: value
        }
      }));
    } else {
      setSurveyData(prev => ({
        ...prev,
        [section]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitSurvey = async () => {
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });
      
      if (response.ok) {
        alert('설문조사가 성공적으로 제출되었습니다!');
        setCurrentStep(steps.length - 1);
      } else {
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Survey submission error:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const resetSurvey = () => {
    setSurveyData({
      storeName: '',
      storeType: '',
      businessArea: '',
      storeSize: '',
      ownerName: '',
      phoneNumber: '',
      email: '',
      naverPlace: {
        attractivePhotos: '',
        reservationFeature: '',
        regularNews: '',
        detailedDirections: '',
        freeMarketingMessage: '',
        seoOptimization: '',
        clipVideo: '',
        statisticsAnalysis: '',
      },
      instagram: {
        searchableContent: '',
        videoCount: '',
        reviews: '',
      },
      blogMarketing: {
        latestContent: '',
        detailedInfo: '',
      },
      google: {
        accurateInfo: '',
      },
      paidAds: {
        naverPlaceAds: '',
        naverPlaceAdsBudget: '',
        naverPowerlink: '',
        naverPowerlinkBudget: '',
        instagramReels: '',
        instagramReelsBudget: '',
      },
    });
    setCurrentStep(0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl mb-4 shadow-lg">
                <span className="text-2xl">🏪</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">매장 기본정보</h2>
              <p className="text-gray-600">매장의 기본 정보를 입력해주세요</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    매장명
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={surveyData.storeName}
                    onChange={(e) => handleInputChange('storeName', '', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="매장명을 입력해주세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    업종
                  </span>
                </label>
                <div className="relative">
                  <select
                    value={surveyData.storeType}
                    onChange={(e) => handleInputChange('storeType', '', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                  >
                    <option value="">업종을 선택해주세요</option>
                    <option value="한식당">🍚 한식당</option>
                    <option value="중식당">🥟 중식당</option>
                    <option value="일식당">🍣 일식당</option>
                    <option value="양식당">🍝 양식당</option>
                    <option value="카페">☕ 카페</option>
                    <option value="베이커리">🥐 베이커리</option>
                    <option value="치킨전문점">🍗 치킨전문점</option>
                    <option value="피자전문점">🍕 피자전문점</option>
                    <option value="분식점">🍜 분식점</option>
                    <option value="기타">🏪 기타</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    상권 유형
                  </span>
                </label>
                <div className="relative">
                  <select
                    value={surveyData.businessArea}
                    onChange={(e) => handleInputChange('businessArea', '', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                  >
                    <option value="">상권을 선택해주세요</option>
                    <option value="주택가">🏘️ 주택가</option>
                    <option value="오피스가">🏢 오피스가</option>
                    <option value="대학가">🎓 대학가</option>
                    <option value="관광지">🗺️ 관광지</option>
                    <option value="상업지구">🛍️ 상업지구</option>
                    <option value="기타">📍 기타</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    매장 규모
                  </span>
                </label>
                <div className="relative">
                  <select
                    value={surveyData.storeSize}
                    onChange={(e) => handleInputChange('storeSize', '', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                  >
                    <option value="">매장 규모를 선택해주세요</option>
                    <option value="10평 미만">📏 10평 미만</option>
                    <option value="10-20평">📐 10-20평</option>
                    <option value="20-30평">📏 20-30평</option>
                    <option value="30-50평">📐 30-50평</option>
                    <option value="50평 이상">🏢 50평 이상</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    사장님 성함
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={surveyData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', '', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="성함을 입력해주세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    연락처
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={surveyData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', '', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  이메일 (선택사항)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={surveyData.email}
                    onChange={(e) => handleInputChange('email', '', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <span className="text-2xl">📍</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">네이버 플레이스 마케팅 현황</h2>
              <p className="text-gray-600">네이버 플레이스 활용 현황을 체크해주세요</p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📸</span>
                  사진이 매력적으로 등재되어 있나요?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['매우 잘 되어있음', '보통', '부족함', '전혀 안됨', '모르겠음'].map(option => (
                    <label key={option} className="relative">
                      <input
                        type="radio"
                        name="attractivePhotos"
                        value={option}
                        checked={surveyData.naverPlace.attractivePhotos === option}
                        onChange={(e) => handleInputChange('naverPlace', 'attractivePhotos', e.target.value)}
                        className="sr-only peer"
                      />
                      <div className="p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-md peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-md">
                        <span className="text-sm font-medium text-gray-700 peer-checked:text-blue-700">{option}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">예약 기능을 활용하고 있나요?</label>
                <div className="space-y-2">
                  {['활발히 사용', '가끔 사용', '설정만 해둠', '사용 안함', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="reservationFeature"
                        value={option}
                        checked={surveyData.naverPlace.reservationFeature === option}
                        onChange={(e) => handleInputChange('naverPlace', 'reservationFeature', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">매장 소식을 주기적으로 올리고 있나요?</label>
                <div className="space-y-2">
                  {['주 3회 이상', '주 1-2회', '월 1-2회', '거의 안함', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="regularNews"
                        value={option}
                        checked={surveyData.naverPlace.regularNews === option}
                        onChange={(e) => handleInputChange('naverPlace', 'regularNews', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">찾아오는 길이 상세하게 설명되어 있나요?</label>
                <div className="space-y-2">
                  {['매우 상세함', '보통', '부족함', '전혀 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="detailedDirections"
                        value={option}
                        checked={surveyData.naverPlace.detailedDirections === option}
                        onChange={(e) => handleInputChange('naverPlace', 'detailedDirections', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">무료 마케팅 메시지로 재방문을 유치하고 있나요?</label>
                <div className="space-y-2">
                  {['적극 활용', '가끔 활용', '설정만 해둠', '사용 안함', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="freeMarketingMessage"
                        value={option}
                        checked={surveyData.naverPlace.freeMarketingMessage === option}
                        onChange={(e) => handleInputChange('naverPlace', 'freeMarketingMessage', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">대표키워드로 SEO 최적화를 하고 있나요?</label>
                <div className="space-y-2">
                  {['잘 하고 있음', '보통', '부족함', '전혀 안함', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="seoOptimization"
                        value={option}
                        checked={surveyData.naverPlace.seoOptimization === option}
                        onChange={(e) => handleInputChange('naverPlace', 'seoOptimization', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">클립 영상으로 매장을 소개하고 있나요?</label>
                <div className="space-y-2">
                  {['여러 개 있음', '1-2개 있음', '만들 예정', '없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="clipVideo"
                        value={option}
                        checked={surveyData.naverPlace.clipVideo === option}
                        onChange={(e) => handleInputChange('naverPlace', 'clipVideo', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">통계를 확인하여 유입 고객을 분석하고 있나요?</label>
                <div className="space-y-2">
                  {['정기적으로 확인', '가끔 확인', '확인 방법 모름', '관심 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="statisticsAnalysis"
                        value={option}
                        checked={surveyData.naverPlace.statisticsAnalysis === option}
                        onChange={(e) => handleInputChange('naverPlace', 'statisticsAnalysis', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">인스타그램 마케팅 현황</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-3">인스타그램에서 매장을 검색하면 노출되는 콘텐츠가 있나요?</label>
                <div className="space-y-2">
                  {['많이 있음', '어느정도 있음', '조금 있음', '거의 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="searchableContent"
                        value={option}
                        checked={surveyData.instagram.searchableContent === option}
                        onChange={(e) => handleInputChange('instagram', 'searchableContent', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">매장 관련 영상이 몇 개 정도 등재되어 있나요?</label>
                <div className="space-y-2">
                  {['10개 이상', '5-9개', '1-4개', '없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="videoCount"
                        value={option}
                        checked={surveyData.instagram.videoCount === option}
                        onChange={(e) => handleInputChange('instagram', 'videoCount', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">고객 후기들이 인스타그램에 있나요?</label>
                <div className="space-y-2">
                  {['많이 있음', '어느정도 있음', '조금 있음', '거의 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="reviews"
                        value={option}
                        checked={surveyData.instagram.reviews === option}
                        onChange={(e) => handleInputChange('instagram', 'reviews', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">체험단/블로그 마케팅 현황</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-3">매장명을 검색했을 때 블로그 콘텐츠가 최신 상태인가요?</label>
                <div className="space-y-2">
                  {['최근 3개월 내', '최근 6개월 내', '1년 이상 된 것', '거의 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="latestContent"
                        value={option}
                        checked={surveyData.blogMarketing.latestContent === option}
                        onChange={(e) => handleInputChange('blogMarketing', 'latestContent', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-3">플레이스에서 보여줄 수 없는 상세 정보가 블로그에 잘 나와있나요?</label>
                <div className="space-y-2">
                  {['매우 상세함', '보통', '부족함', '거의 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="detailedInfo"
                        value={option}
                        checked={surveyData.blogMarketing.detailedInfo === option}
                        onChange={(e) => handleInputChange('blogMarketing', 'detailedInfo', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">구글 마케팅 현황</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-3">구글에 매장 정보가 정확하게 등재되어 있나요?</label>
                <div className="space-y-2">
                  {['매우 정확함', '대부분 정확함', '일부 틀림', '많이 틀림', '등재 안됨', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="accurateInfo"
                        value={option}
                        checked={surveyData.google.accurateInfo === option}
                        onChange={(e) => handleInputChange('google', 'accurateInfo', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">유료 광고 현황</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-3">네이버 플레이스 상위노출 광고를 진행한 적이 있나요?</label>
                <div className="space-y-2">
                  {['현재 진행중', '과거에 했음', '해본 적 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="naverPlaceAds"
                        value={option}
                        checked={surveyData.paidAds.naverPlaceAds === option}
                        onChange={(e) => handleInputChange('paidAds', 'naverPlaceAds', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(surveyData.paidAds.naverPlaceAds === '현재 진행중' || surveyData.paidAds.naverPlaceAds === '과거에 했음') && (
                <div>
                  <label className="block text-lg font-medium mb-3">월 광고비는 얼마 정도인가요?</label>
                  <div className="space-y-2">
                    {['10만원 미만', '10-30만원', '30-50만원', '50-100만원', '100만원 이상', '기억 안남'].map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="naverPlaceAdsBudget"
                          value={option}
                          checked={surveyData.paidAds.naverPlaceAdsBudget === option}
                          onChange={(e) => handleInputChange('paidAds', 'naverPlaceAdsBudget', e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-lg font-medium mb-3">네이버 파워링크를 진행한 적이 있나요?</label>
                <div className="space-y-2">
                  {['현재 진행중', '과거에 했음', '해본 적 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="naverPowerlink"
                        value={option}
                        checked={surveyData.paidAds.naverPowerlink === option}
                        onChange={(e) => handleInputChange('paidAds', 'naverPowerlink', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(surveyData.paidAds.naverPowerlink === '현재 진행중' || surveyData.paidAds.naverPowerlink === '과거에 했음') && (
                <div>
                  <label className="block text-lg font-medium mb-3">월 광고비는 얼마 정도인가요?</label>
                  <div className="space-y-2">
                    {['10만원 미만', '10-30만원', '30-50만원', '50-100만원', '100만원 이상', '기억 안남'].map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="naverPowerlinkBudget"
                          value={option}
                          checked={surveyData.paidAds.naverPowerlinkBudget === option}
                          onChange={(e) => handleInputChange('paidAds', 'naverPowerlinkBudget', e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-lg font-medium mb-3">인스타그램 릴스 스폰서 광고를 진행하고 있나요?</label>
                <div className="space-y-2">
                  {['현재 진행중', '과거에 했음', '해본 적 없음', '모르겠음'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="instagramReels"
                        value={option}
                        checked={surveyData.paidAds.instagramReels === option}
                        onChange={(e) => handleInputChange('paidAds', 'instagramReels', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(surveyData.paidAds.instagramReels === '현재 진행중' || surveyData.paidAds.instagramReels === '과거에 했음') && (
                <div>
                  <label className="block text-lg font-medium mb-3">월 광고비는 얼마 정도인가요?</label>
                  <div className="space-y-2">
                    {['10만원 미만', '10-30만원', '30-50만원', '50-100만원', '100만원 이상', '기억 안남'].map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="instagramReelsBudget"
                          value={option}
                          checked={surveyData.paidAds.instagramReelsBudget === option}
                          onChange={(e) => handleInputChange('paidAds', 'instagramReelsBudget', e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold mb-4">설문조사가 완료되었습니다!</h2>
              <p className="text-lg text-gray-600 mb-8">
                소중한 시간을 내어 설문에 참여해주셔서 감사합니다.<br/>
                제출하신 정보는 매장 맞춤 마케팅 컨설팅에 활용됩니다.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-blue-800 font-medium mb-4">
                  담당자가 검토 후 연락드리겠습니다.<br/>
                  추가 문의사항이 있으시면 언제든 연락해주세요.
                </p>
                
                {/* 카카오톡 문의 버튼 */}
                <div className="flex justify-center">
                  <a
                    href="http://pf.kakao.com/_QUTxcb/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3c-4.97 0-9 3.41-9 7.61 0 2.47 1.21 4.67 3.12 6.09l-.52 2.78c-.06.32.2.58.52.52l3.48-.65c.85.18 1.74.27 2.65.27 4.97 0 9-3.41 9-7.61S16.97 3 12 3z"/>
                    </svg>
                    <span>카카오톡으로 문의하기</span>
                  </a>
                </div>
              </div>
              
              {/* 주관 및 지원 기관 정보 */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-semibold">📚 설문 주관:</span>
                    <span className="text-gray-700 font-medium">청운대학교 정현우 책임교수</span>
                  </div>
                  <div className="hidden md:block w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 font-semibold">🤝 마케팅 지원:</span>
                    <span className="text-gray-700 font-medium">(주)위즈더플래닝</span>
                  </div>
                </div>
              </div>

              {/* 처음으로 돌아가기 버튼 */}
              <div className="flex justify-center">
                <button
                  onClick={resetSurvey}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  <span>처음으로 돌아가기</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return surveyData.storeName && surveyData.storeType && surveyData.businessArea && 
               surveyData.storeSize && surveyData.ownerName && surveyData.phoneNumber;
      case 1:
        return Object.values(surveyData.naverPlace).every(value => value !== '');
      case 2:
        return Object.values(surveyData.instagram).every(value => value !== '');
      case 3:
        return Object.values(surveyData.blogMarketing).every(value => value !== '');
      case 4:
        return surveyData.google.accurateInfo !== '';
      case 5:
        return surveyData.paidAds.naverPlaceAds !== '' && 
               surveyData.paidAds.naverPowerlink !== '' && 
               surveyData.paidAds.instagramReels !== '';
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* 실시간 문의 플로팅 버튼 */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="http://pf.kakao.com/_QUTxcb/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-medium"
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 3.41-9 7.61 0 2.47 1.21 4.67 3.12 6.09l-.52 2.78c-.06.32.2.58.52.52l3.48-.65c.85.18 1.74.27 2.65.27 4.97 0 9-3.41 9-7.61S16.97 3 12 3z"/>
              </svg>
              <span className="hidden sm:block">실시간 문의</span>
              <span className="sm:hidden">문의</span>
            </div>
            
            {/* 펄스 애니메이션 */}
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute w-full h-full bg-red-500 rounded-full"></div>
            </div>
          </a>
        </div>
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 backdrop-blur-sm">
          {/* 주관 기관 정보 */}
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-semibold">📚 주관:</span>
                <span className="text-gray-700 font-medium">청운대학교 정현우 책임교수</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-semibold">🤝 마케팅 지원:</span>
                <span className="text-gray-700 font-medium">(주)위즈더플래닝</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl">🍽️</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              우리 식당 &apos;SNS마케팅 건강&apos; 진단표_N스마트플레이스
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              매장 맞춤 마케팅 컨설팅을 위한 현황 파악 설문입니다
            </p>
          </div>
          
          {/* 진행상황 바 */}
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>진행 상황</span>
              <span>{currentStep + 1} / {steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-md' 
                      : 'bg-gray-300'
                  }`}></div>
                  <span className={`text-xs mt-1 max-w-16 text-center ${
                    index === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 설문 내용 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 backdrop-blur-sm">
          {renderStep()}
        </div>

        {/* 네비게이션 버튼 */}
        {currentStep < steps.length - 1 && (
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-8 py-4 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:shadow-md transition-all duration-200 shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>
            
            {currentStep === steps.length - 2 ? (
              <button
                onClick={submitSurvey}
                disabled={!isStepValid()}
                className="flex items-center px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 shadow-md"
              >
                <span>제출하기</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 shadow-md"
              >
                <span>다음</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
