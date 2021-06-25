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

**`4. MainPage의 AppNavbar 구현 간단한 user정보를 나타내고 dropdown을 이용하여  `**
**`프로필 이미지 수정 및 로그아웃 기능 추가`**

**`5. Header부분 Create Plan 기능 추가, 선택시 Plan title, description 입력 후 추가`**

**`6. CardList 추가, firebase를 이용하여 실시간으로 보여주는 방식으로 구현`**

**`7. 카드부분 Plan Edit, Delete 기능 추가`**

**`8. plan title 검색 기능 추가`**

**`9. MainPage에서 CardList가 plan을 보여주는 방법 수정`**

**`10. DB 구조 수정`**

**`11. planPage 추가 해당 Plan의 각 Section과 Section안의 TodoList를 보여준다.`**

**`12. section 추가, 수정, 삭제 기능 구현`**

**`13. section내부의 todoList 추가 삭제 구현 css작업 때문에 시간을 많이 소모함  `**
**`planPage의 전체적인 UI는 todoist를 따라가고 있지만 todoList의 ModalComponent는 트렐로처럼 만들 예정`**

**`14. ModalComponent 내부에 react-Markdown을 이용하여 수정할 수 있도록 만들어놓음  `**
**`Todo를 새로 만들 때 빈 todoContent값을 미리 저장 시키고 Modal실행 시 저장된 todoContent를 띄어줌  `**
**`해당 todoContent를 수정할 수 있도록 만들어놓음`**

**`15. 페이지 새로 고침 시 MainPage로 이동하는 이슈  `**
**`인증 시 history.push('/')으로 이동하는 부분 때문에 문제가 생겼었다.  `**
**`하지만 내가 현재 있는 PlanPage의 정보가 따로 저장되어 있지 않아 새로 고침시 데이터가 삭제되는 이슈  `**
**`redux-persist를 이용하여 이슈 해결  `**