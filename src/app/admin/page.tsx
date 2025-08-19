'use client';

import { useState, useEffect } from 'react';

interface SurveyResult {
  id: string;
  submittedAt: string;
  storeName: string;
  storeType: string;
  businessArea: string;
  storeSize: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
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
  instagram: {
    searchableContent: string;
    videoCount: string;
    reviews: string;
  };
  blogMarketing: {
    latestContent: string;
    detailedInfo: string;
  };
  google: {
    accurateInfo: string;
  };
  paidAds: {
    naverPlaceAds: string;
    naverPlaceAdsBudget: string;
    naverPowerlink: string;
    naverPowerlinkBudget: string;
    instagramReels: string;
    instagramReelsBudget: string;
  };
}

export default function AdminPage() {
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SurveyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 간단한 비밀번호 인증 (실제 프로덕션에서는 더 안전한 인증 방식 사용)
  const handleLogin = () => {
    if (password === 'admin123') { // 실제로는 환경변수나 더 안전한 방식 사용
      setIsAuthenticated(true);
      loadSurveyResults();
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const loadSurveyResults = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/surveys');
      if (response.ok) {
        const data = await response.json();
        setSurveyResults(data.surveys || []);
      } else {
        console.error('Failed to load survey results');
      }
    } catch (error) {
      console.error('Error loading survey results:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMarketingScore = (result: SurveyResult) => {
    let score = 0;
    let total = 0;

    // 네이버 플레이스 점수 계산
    Object.values(result.naverPlace).forEach(value => {
      total++;
      if (value.includes('매우') || value.includes('활발') || value.includes('잘') || value.includes('정기적')) {
        score += 2;
      } else if (value.includes('보통') || value.includes('가끔')) {
        score += 1;
      }
    });

    // 인스타그램 점수 계산
    Object.values(result.instagram).forEach(value => {
      total++;
      if (value.includes('많이') || value.includes('10개 이상')) {
        score += 2;
      } else if (value.includes('어느정도') || value.includes('5-9개')) {
        score += 1;
      }
    });

    // 기타 항목들 점수 계산
    [result.blogMarketing, result.google].forEach(section => {
      Object.values(section).forEach(value => {
        total++;
        if (value.includes('매우') || value.includes('최근')) {
          score += 2;
        } else if (value.includes('보통') || value.includes('대부분')) {
          score += 1;
        }
      });
    });

    return Math.round((score / (total * 2)) * 100);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">관리자 로그인</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">설문조사 결과 관리</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            로그아웃
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 설문 결과 목록 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">설문 결과 목록 ({surveyResults.length}건)</h2>
                <button
                  onClick={loadSurveyResults}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                >
                  새로고침
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {surveyResults.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">설문 결과가 없습니다.</p>
                ) : (
                  surveyResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => setSelectedResult(result)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedResult?.id === result.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{result.storeName}</h3>
                          <p className="text-sm text-gray-600">{result.storeType} • {result.businessArea}</p>
                          <p className="text-sm text-gray-500">{formatDate(result.submittedAt)}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold px-2 py-1 rounded ${
                            getMarketingScore(result) >= 70 ? 'bg-green-100 text-green-800' :
                            getMarketingScore(result) >= 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            마케팅 점수: {getMarketingScore(result)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 선택된 설문 결과 상세 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {selectedResult ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">설문 상세 정보</h2>
                    <div className="text-sm text-gray-500">
                      {formatDate(selectedResult.submittedAt)}
                    </div>
                  </div>

                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {/* 매장 정보 */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">📍 매장 정보</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><strong>매장명:</strong> {selectedResult.storeName}</div>
                        <div><strong>업종:</strong> {selectedResult.storeType}</div>
                        <div><strong>상권:</strong> {selectedResult.businessArea}</div>
                        <div><strong>규모:</strong> {selectedResult.storeSize}</div>
                        <div><strong>사장님:</strong> {selectedResult.ownerName}</div>
                        <div><strong>연락처:</strong> {selectedResult.phoneNumber}</div>
                        {selectedResult.email && (
                          <div className="col-span-2"><strong>이메일:</strong> {selectedResult.email}</div>
                        )}
                      </div>
                    </div>

                    {/* 네이버 플레이스 */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">🔍 네이버 플레이스</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>사진 등재:</strong> {selectedResult.naverPlace.attractivePhotos}</div>
                        <div><strong>예약 기능:</strong> {selectedResult.naverPlace.reservationFeature}</div>
                        <div><strong>매장 소식:</strong> {selectedResult.naverPlace.regularNews}</div>
                        <div><strong>찾아오는 길:</strong> {selectedResult.naverPlace.detailedDirections}</div>
                        <div><strong>마케팅 메시지:</strong> {selectedResult.naverPlace.freeMarketingMessage}</div>
                        <div><strong>SEO 최적화:</strong> {selectedResult.naverPlace.seoOptimization}</div>
                        <div><strong>클립 영상:</strong> {selectedResult.naverPlace.clipVideo}</div>
                        <div><strong>통계 분석:</strong> {selectedResult.naverPlace.statisticsAnalysis}</div>
                      </div>
                    </div>

                    {/* 인스타그램 */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">📱 인스타그램</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>검색 노출:</strong> {selectedResult.instagram.searchableContent}</div>
                        <div><strong>영상 개수:</strong> {selectedResult.instagram.videoCount}</div>
                        <div><strong>고객 후기:</strong> {selectedResult.instagram.reviews}</div>
                      </div>
                    </div>

                    {/* 블로그 마케팅 */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">📝 블로그 마케팅</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>최신 콘텐츠:</strong> {selectedResult.blogMarketing.latestContent}</div>
                        <div><strong>상세 정보:</strong> {selectedResult.blogMarketing.detailedInfo}</div>
                      </div>
                    </div>

                    {/* 구글 */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">🌐 구글</h3>
                      <div className="text-sm">
                        <div><strong>정보 정확성:</strong> {selectedResult.google.accurateInfo}</div>
                      </div>
                    </div>

                    {/* 유료 광고 */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">💰 유료 광고</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>네이버 플레이스 광고:</strong> {selectedResult.paidAds.naverPlaceAds}</div>
                        {selectedResult.paidAds.naverPlaceAdsBudget && (
                          <div className="ml-4"><strong>예산:</strong> {selectedResult.paidAds.naverPlaceAdsBudget}</div>
                        )}
                        <div><strong>네이버 파워링크:</strong> {selectedResult.paidAds.naverPowerlink}</div>
                        {selectedResult.paidAds.naverPowerlinkBudget && (
                          <div className="ml-4"><strong>예산:</strong> {selectedResult.paidAds.naverPowerlinkBudget}</div>
                        )}
                        <div><strong>인스타그램 릴스:</strong> {selectedResult.paidAds.instagramReels}</div>
                        {selectedResult.paidAds.instagramReelsBudget && (
                          <div className="ml-4"><strong>예산:</strong> {selectedResult.paidAds.instagramReelsBudget}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 연락처 정보 */}
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold mb-2">📞 연락 정보</h3>
                    <p className="text-sm"><strong>연락처:</strong> {selectedResult.phoneNumber}</p>
                    {selectedResult.email && (
                      <p className="text-sm"><strong>이메일:</strong> {selectedResult.email}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>좌측에서 설문 결과를 선택하세요</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
