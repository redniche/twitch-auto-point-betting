//크롬 확장은 이걸 제일 먼저 실행할 것임.
//문서에 script HTML요소를 만들어 반환함.
//https://developer.mozilla.org/ko/docs/Web/API/Document/createElement 을 확인
var element = document.createElement("script");
//script 요소는 src라는 외부 스크립트를 가리키는 URI을 적어넣을 수 있는 속성을 가짐
//따라서 런타임에서 auto-clicker.js란 파일 URL을 가져다 저기다 가져다 박고
//이후  html요소에 추가하는셈
//@ts-ignore 타입체크 무시
element.src = chrome.runtime.getURL("dist/src/betting-manager.js");

//html 문서의 body에 요소를 추가함.
document.body.appendChild(element);
