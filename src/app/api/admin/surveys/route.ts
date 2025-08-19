import { NextRequest, NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // 저장된 설문조사 파일들을 읽어오기
    const surveysDir = path.join(process.cwd(), 'surveys');
    
    try {
      const files = await readdir(surveysDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      const surveys = await Promise.all(
        jsonFiles.map(async (file) => {
          try {
            const filePath = path.join(surveysDir, file);
            const content = await readFile(filePath, 'utf-8');
            const surveyData = JSON.parse(content);
            
            // 파일명에서 타임스탬프 추출
            const timestamp = file.split('_').pop()?.replace('.json', '') || '';
            const submittedAt = timestamp.replace(/-/g, ':').split('T').join(' ');
            
            return {
              id: file.replace('.json', ''),
              submittedAt: submittedAt || new Date().toISOString(),
              ...surveyData,
            };
          } catch (error) {
            console.error(`Error reading file ${file}:`, error);
            return null;
          }
        })
      );
      
      // null 값 제거하고 최신순으로 정렬
      const validSurveys = surveys
        .filter(survey => survey !== null)
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      
      return NextResponse.json({
        success: true,
        surveys: validSurveys,
        count: validSurveys.length,
      });
      
    } catch {
      // surveys 디렉토리가 없는 경우 빈 배열 반환
      console.log('No surveys directory found');
      return NextResponse.json({
        success: true,
        surveys: [],
        count: 0,
        message: 'No surveys directory found. Surveys will be created when first survey is submitted.',
      });
    }
    
  } catch (error) {
    console.error('Error fetching surveys:', error);
    
          return NextResponse.json(
        {
          success: false,
          message: '설문조사 목록을 불러오는 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
        },
        { status: 500 }
      );
  }
}

// 설문조사 삭제 (선택사항)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const surveyId = searchParams.get('id');
    
    if (!surveyId) {
      return NextResponse.json(
        { success: false, message: '설문조사 ID가 필요합니다.' },
        { status: 400 }
      );
    }
    
    const surveysDir = path.join(process.cwd(), 'surveys');
    const filePath = path.join(surveysDir, `${surveyId}.json`);
    
    const { unlink } = await import('fs/promises');
    await unlink(filePath);
    
    return NextResponse.json({
      success: true,
      message: '설문조사가 삭제되었습니다.',
    });
    
  } catch (error) {
    console.error('Error deleting survey:', error);
    
          return NextResponse.json(
        {
          success: false,
          message: '설문조사 삭제 중 오류가 발생했습니다.',
          error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
        },
        { status: 500 }
      );
  }
}
