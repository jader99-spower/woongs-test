export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">삼천리</p>
            <p className="text-sm">사내 동아리 커뮤니티</p>
            <p className="text-xs mt-2 text-gray-500">
              구성원 여러분의 건강한 취미와 소통을 응원합니다.
            </p>
          </div>

          <div className="text-sm space-y-1">
            <p className="text-white font-medium mb-2">문의</p>
            <p>인사팀: hr@samchully.co.kr</p>
            <p>동아리 신청 문의는 각 동아리 담당자에게 연락해 주세요.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-gray-600">
          © 2025 삼천리 All rights reserved.
        </div>
      </div>
    </footer>
  );
}
