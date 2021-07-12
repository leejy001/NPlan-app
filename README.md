<h1 align="center">Welcome to Nplan ✨</h1>
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux Thunk-999999?style=flat-square&logo=Redux-Thunk&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>

<div>
 <img alt="React" src="https://img.shields.io/badge/React-17.0.2-red.svg"> <img alt="Redux" src="https://img.shields.io/badge/Redux-4.1.0-blue.svg"> <img alt="ReduxThunk" src="https://img.shields.io/badge/Redux Thunk-2.3.0-blue.svg">  <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-5.0.1-blueviolet.svg">  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-8.6.5-green.svg"> <img alt="platform" src="https://img.shields.io/badge/platform-Web-orange.svg">

### 🔥 Motivation

> React + Firebase 기술을 공부하기 위해 시작한 프로젝트입니다.
> Firebase의 Firestore와 Storage를 이용하여 DB를 저장하고 호스팅을 했습니다.

## 서비스 소개

### [Nplan](https://nplan-app.web.app/) 일정관리 서비스 프로젝트

- 나만의 일정관리 서비스.
- react-markdown를 이용한 간단한 문서 편집 기능 제공합니다.
- Plan, section 별로 검색 기능을 제공해 유용한 정보를 쉽고 빠르게 찾을 수 있습니다.

## UI

### 1) 로그인과 회원가입

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302040-8d328600-e366-11eb-9cae-d94553871f1e.gif"/>
       <br><br>[로그인]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125302045-8e63b300-e366-11eb-923a-dc3836caf8a3.gif"/>
       <br><br>[회원가입] 
    </th>
  </tr>
</table>

- 로그인/회원가입 성공 시 MainPage로 넘어감

### 2) Plan 추가/수정/삭제

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302648-1b0e7100-e367-11eb-8520-fe011262dfdb.gif"/>
       <br><br>[Plan 추가]
     </th>
          <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302656-1c3f9e00-e367-11eb-99db-da2a8673778b.gif"/>
       <br><br>[Plan 수정]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125302664-1ea1f800-e367-11eb-8db7-b84722386b08.gif"/>
       <br><br>[Plan 삭제] 
    </th>
  </tr>
</table>

- Create plan 버튼을 누르면 계획 추가하고 Plan Card 우측 하단의 수정 삭제 버튼을 통해 수정/삭제
- 모달을 통해 계획을 추가 및 수정
  - react-bootstrap 이용
- 삭제 시 Alert을 통해 한번 더 확인한 뒤에 삭제

### 3) Section 추가/수정/삭제

<table>
   <tr>
     <th align="center">
       <img width="375" alt="1" src="https://user-images.githubusercontent.com/49552804/125302968-658fed80-e367-11eb-9a0e-e0b0fb7af01c.gif"/>
       <br><br>[Section 추가]
     </th>
          <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302972-66c11a80-e367-11eb-95a2-0c1a65e40087.gif"/>
       <br><br>[Section 삭제]
     </th>
  </tr>
</table>

- 섹션 추가 버튼을 통해 섹션을 새로 추가
- 섹션 제목 옆의 dropdown 버튼을 통해 섹션 수정/삭제

### 4) Todo 추가/수정/삭제

<table>
   <tr>
     <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125303924-21511d00-e368-11eb-976d-ef886763cfd5.gif"/>
       <br><br>[Todo 추가]
     </th>
        <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125303929-21e9b380-e368-11eb-815e-0c32a59972ea.gif"/>
       <br><br>[Todo 수정]
     </th>
          <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125303931-22824a00-e368-11eb-91d6-2e0d414fd50c.gif"/>
       <br><br>[Todo 삭제]
     </th>
  </tr>
</table>

- 할 일 추가 버튼 클릭 시 Todo title 입력하고 추가
- 해당 TodoItem에 마우스 hover 시 edit 버튼 노출되고 클릭하여 Todo title 수정
- TodoItem의 체크 버튼 누르면 TodoItem 삭제

### 5) Search

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125305240-28c4f600-e369-11eb-9a90-fe799833d488.gif"/>
       <br><br>[Section title 검색]
     </th>
        <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125305243-29f62300-e369-11eb-88e4-f4ae0076242a.gif"/>
       <br><br>[중요도 검색]
  </tr>
</table>

- Section search에서 Input 값의 변화를 실시간으로 감지하여 입력 즉시 검색 데이터를 받아옴
- 중요도(high/medium/easy/all) 라디오 버튼 클릭 시 섹션 별로 해당 중요도의 TodoItem이 노출

![npplansearch](https://user-images.githubusercontent.com/49552804/125305248-29f62300-e369-11eb-987c-8d4e3ea5eba3.gif)

- Plan search, Input 값의 변화를 실시간으로 감지하여 입력 즉시 검색 데이터를 받아옴

## [활용 기술](https://github.com/leejy001/NPlan-app/wiki/%ED%99%9C%EC%9A%A9-%EA%B8%B0%EC%88%A0)

## [개발 일지](https://github.com/leejy001/NPlan-app/wiki/%EA%B0%9C%EB%B0%9C-%EC%9D%BC%EC%A7%80)

## Todo

- [ ] DB 구조 수정
- [ ] Firebase functions 적용
- [ ] 협업 기능 추가
