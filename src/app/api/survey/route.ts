import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 설문조사 데이터 타입 정의
interface SurveyData {
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

// 환경변수에서 수신자 메일 목록 가져오기 (쉼표로 구분)
const getRecipientEmails = (): string[] => {
  const emails = process.env.RECIPIENT_EMAILS || 'ceo@wiztheplanning.com';
  return emails.split(',').map(email => email.trim());
};

// 메일 발송을 위한 transporter 설정
const createTransporter = () => {
  // Gmail을 사용하는 경우
  if (process.env.EMAIL_PROVIDER === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Gmail 앱 비밀번호
      },
    });
  }
  
  // SMTP 서버를 직접 사용하는 경우
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// HTML 이메일 템플릿 생성
const createEmailTemplate = (data: SurveyData): string => {
  const currentDate = new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>마케팅 컨설팅 설문조사 결과</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
            .section { margin-bottom: 30px; }
            .section-title { background-color: #e9ecef; padding: 15px; border-radius: 5px; font-weight: bold; font-size: 18px; margin-bottom: 15px; }
            .question { margin-bottom: 10px; }
            .question-title { font-weight: bold; color: #495057; margin-bottom: 5px; }
            .answer { background-color: #f8f9fa; padding: 8px 12px; border-radius: 4px; margin-left: 20px; }
            .store-info { background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; }
            .urgent { color: #dc3545; font-weight: bold; }
            .good { color: #28a745; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🍽️ 음식점/카페 마케팅 컨설팅 설문조사 결과</h1>
            <p><strong>제출일시:</strong> ${currentDate}</p>
        </div>

        <div class="section">
            <div class="section-title">📍 매장 기본정보</div>
            <div class="store-info">
                <div class="question">
                    <div class="question-title">매장명:</div>
                    <div class="answer">${data.storeName}</div>
                </div>
                <div class="question">
                    <div class="question-title">업종:</div>
                    <div class="answer">${data.storeType}</div>
                </div>
                <div class="question">
                    <div class="question-title">상권 유형:</div>
                    <div class="answer">${data.businessArea}</div>
                </div>
                <div class="question">
                    <div class="question-title">매장 규모:</div>
                    <div class="answer">${data.storeSize}</div>
                </div>
                <div class="question">
                    <div class="question-title">사장님 성함:</div>
                    <div class="answer">${data.ownerName}</div>
                </div>
                <div class="question">
                    <div class="question-title">연락처:</div>
                    <div class="answer">${data.phoneNumber}</div>
                </div>
                <div class="question">
                    <div class="question-title">이메일:</div>
                    <div class="answer">${data.email || '미입력'}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">🔍 네이버 플레이스 마케팅 현황</div>
            <div class="question">
                <div class="question-title">사진이 매력적으로 등재되어 있나요?</div>
                <div class="answer">${data.naverPlace.attractivePhotos}</div>
            </div>
            <div class="question">
                <div class="question-title">예약 기능을 활용하고 있나요?</div>
                <div class="answer">${data.naverPlace.reservationFeature}</div>
            </div>
            <div class="question">
                <div class="question-title">매장 소식을 주기적으로 올리고 있나요?</div>
                <div class="answer">${data.naverPlace.regularNews}</div>
            </div>
            <div class="question">
                <div class="question-title">찾아오는 길이 상세하게 설명되어 있나요?</div>
                <div class="answer">${data.naverPlace.detailedDirections}</div>
            </div>
            <div class="question">
                <div class="question-title">무료 마케팅 메시지로 재방문을 유치하고 있나요?</div>
                <div class="answer">${data.naverPlace.freeMarketingMessage}</div>
            </div>
            <div class="question">
                <div class="question-title">대표키워드로 SEO 최적화를 하고 있나요?</div>
                <div class="answer">${data.naverPlace.seoOptimization}</div>
            </div>
            <div class="question">
                <div class="question-title">클립 영상으로 매장을 소개하고 있나요?</div>
                <div class="answer">${data.naverPlace.clipVideo}</div>
            </div>
            <div class="question">
                <div class="question-title">통계를 확인하여 유입 고객을 분석하고 있나요?</div>
                <div class="answer">${data.naverPlace.statisticsAnalysis}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">📱 인스타그램 마케팅 현황</div>
            <div class="question">
                <div class="question-title">인스타그램에서 매장을 검색하면 노출되는 콘텐츠가 있나요?</div>
                <div class="answer">${data.instagram.searchableContent}</div>
            </div>
            <div class="question">
                <div class="question-title">매장 관련 영상이 몇 개 정도 등재되어 있나요?</div>
                <div class="answer">${data.instagram.videoCount}</div>
            </div>
            <div class="question">
                <div class="question-title">고객 후기들이 인스타그램에 있나요?</div>
                <div class="answer">${data.instagram.reviews}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">📝 체험단/블로그 마케팅 현황</div>
            <div class="question">
                <div class="question-title">매장명을 검색했을 때 블로그 콘텐츠가 최신 상태인가요?</div>
                <div class="answer">${data.blogMarketing.latestContent}</div>
            </div>
            <div class="question">
                <div class="question-title">플레이스에서 보여줄 수 없는 상세 정보가 블로그에 잘 나와있나요?</div>
                <div class="answer">${data.blogMarketing.detailedInfo}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">🌐 구글 마케팅 현황</div>
            <div class="question">
                <div class="question-title">구글에 매장 정보가 정확하게 등재되어 있나요?</div>
                <div class="answer">${data.google.accurateInfo}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">💰 유료 광고 현황</div>
            <div class="question">
                <div class="question-title">네이버 플레이스 상위노출 광고를 진행한 적이 있나요?</div>
                <div class="answer">${data.paidAds.naverPlaceAds}</div>
            </div>
            ${data.paidAds.naverPlaceAdsBudget ? `
            <div class="question">
                <div class="question-title">네이버 플레이스 광고 월 예산:</div>
                <div class="answer">${data.paidAds.naverPlaceAdsBudget}</div>
            </div>
            ` : ''}
            <div class="question">
                <div class="question-title">네이버 파워링크를 진행한 적이 있나요?</div>
                <div class="answer">${data.paidAds.naverPowerlink}</div>
            </div>
            ${data.paidAds.naverPowerlinkBudget ? `
            <div class="question">
                <div class="question-title">네이버 파워링크 월 예산:</div>
                <div class="answer">${data.paidAds.naverPowerlinkBudget}</div>
            </div>
            ` : ''}
            <div class="question">
                <div class="question-title">인스타그램 릴스 스폰서 광고를 진행하고 있나요?</div>
                <div class="answer">${data.paidAds.instagramReels}</div>
            </div>
            ${data.paidAds.instagramReelsBudget ? `
            <div class="question">
                <div class="question-title">인스타그램 릴스 광고 월 예산:</div>
                <div class="answer">${data.paidAds.instagramReelsBudget}</div>
            </div>
            ` : ''}
        </div>

        <div style="margin-top: 40px; padding: 20px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px;">
            <h3>📋 컨설팅 대응 필요 사항</h3>
            <p>위 설문 결과를 바탕으로 맞춤형 마케팅 컨설팅을 진행해주세요.</p>
            <p><strong>연락처:</strong> ${data.phoneNumber}</p>
            ${data.email ? `<p><strong>이메일:</strong> ${data.email}</p>` : ''}
        </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const surveyData: SurveyData = await request.json();

    // 항상 설문 데이터를 콘솔에 로그 (백업용)
    console.log('Survey Data Received:', JSON.stringify(surveyData, null, 2));

    let emailSent = false;
    let emailError = null;

    // 이메일 발송 시도 (실패해도 설문은 성공으로 처리)
    if (process.env.EMAIL_USER) {
      try {
        const transporter = createTransporter();
        const recipients = getRecipientEmails();
        const htmlContent = createEmailTemplate(surveyData);

        const mailOptions = {
          from: `"마케팅 컨설팅 설문조사" <${process.env.EMAIL_USER}>`,
          to: recipients.join(', '),
          subject: `[신규 설문] ${surveyData.storeName} - 마케팅 컨설팅 설문조사 결과`,
          html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log('Email sent successfully to:', recipients.join(', '));
      } catch (error) {
        emailError = error;
        console.error('Email sending failed:', error);
        console.log('Survey data preserved despite email failure');
      }
    } else {
      console.log('EMAIL_USER not configured. Skipping email sending.');
    }

    // JSON 파일 저장 시도 (선택사항)
    if (process.env.SAVE_TO_FILE === 'true') {
      try {
        const { promises: fs } = await import('fs');
        const path = await import('path');
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `survey_${surveyData.storeName}_${timestamp}.json`;
        const surveysDir = path.join(process.cwd(), 'surveys');
        
        await fs.mkdir(surveysDir, { recursive: true });
        await fs.writeFile(
          path.join(surveysDir, filename),
          JSON.stringify(surveyData, null, 2)
        );
        console.log('Survey data saved to file:', filename);
      } catch (fileError) {
        console.error('File save error:', fileError);
      }
    }

    // 설문은 항상 성공으로 처리 (이메일 실패와 관계없이)
    return NextResponse.json({
      success: true,
      message: emailSent 
        ? '설문조사가 성공적으로 제출되었습니다.' 
        : '설문조사가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.',
      emailSent,
    });

  } catch (error) {
    console.error('Survey submission error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: '설문조사 제출 중 오류가 발생했습니다. 다시 시도해주세요.',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
      },
      { status: 500 }
    );
  }
}
