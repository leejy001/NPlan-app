# NPlan App 프로젝트

### firebase, React, Redux-Thunk

React.js 환경 내에서 **redux**와 **redux-thunk**를 이용하여 구성

또한 **firebase**를 이용하여 간단한 Backend 시스템을 구축하여 연동한다.

## Redux

**action** : 모델의 행위를 정의.
**reducer** : 행위에 대한 응답으로 **store** 변경 반환.

- **index.js** 에서 **stroe** 정의 및 주입 (react-redux 모듈 이용)
- 비동기 로직 처리에 대한 솔루션 없음

## Redux-Thunk

**Redux**의 부족한 부분을 채워주는 기능을 담당하는 미들웨어 (네트워크 요청 기능)
**Thunk**는 **action**의 **dispatch**를 지연시키는데 사용될 수 있으며,
특정 조건이 충족되는 경우에만 **dispatch**할 수 있다.

## Firebase

클라우드 데이터베이스 서비스 및 기능 제공

- **firebase** javascript 모듈 이용. (auth, storage, firestore)

## 진행 사항

**`1. CRA & 초기 셋팅`**

**`2. firebase를 이용하여 로그인 시 인증이 제대로 되는지 확인`**

**`3. 로그인, 회원가입 기능 및 폼 구현`**

**`4. MainPage의 AppNavbar 구현 간단한 user정보를 나타내고 dropdown을 이용하여 프로필 이미지 수정 및 로그아웃 기능 추가`**

**`5. Header부분 Create Plan 기능 추가, 선택시 Plan title, description 입력 후 추가`**

**`6. CardList 추가, firebase를 이용하여 실시간으로 보여주는 방식으로 구현`**

**`7. 카드부분 Plan Edit, Delete 기능 추가`**
# NPlan-app
