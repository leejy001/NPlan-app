<h1 align="center">Welcome to Nplan โจ</h1>
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux Thunk-999999?style=flat-square&logo=Redux-Thunk&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>

<div>
 <img alt="React" src="https://img.shields.io/badge/React-17.0.2-red.svg"> <img alt="Redux" src="https://img.shields.io/badge/Redux-4.1.0-blue.svg"> <img alt="ReduxThunk" src="https://img.shields.io/badge/Redux Thunk-2.3.0-blue.svg">  <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-5.0.1-blueviolet.svg">  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-8.6.5-green.svg"> <img alt="platform" src="https://img.shields.io/badge/platform-Web-orange.svg">

### ๐ฅ Motivation

> React + Firebase ๊ธฐ์ ์ ๊ณต๋ถํ๊ธฐ ์ํด ์์ํ ํ๋ก์ ํธ์๋๋ค.
> Firebase์ Firestore์ Storage๋ฅผ ์ด์ฉํ์ฌ DB๋ฅผ ์ ์ฅํ๊ณ  ํธ์คํ์ ํ์ต๋๋ค.

## ์๋น์ค ์๊ฐ

### [Nplan](https://nplan-app.web.app/) ์ผ์ ๊ด๋ฆฌ ์๋น์ค ํ๋ก์ ํธ

- ๋๋ง์ ์ผ์ ๊ด๋ฆฌ ์๋น์ค.
- react-markdown๋ฅผ ์ด์ฉํ ๊ฐ๋จํ ๋ฌธ์ ํธ์ง ๊ธฐ๋ฅ ์ ๊ณตํฉ๋๋ค.
- Plan, section ๋ณ๋ก ๊ฒ์ ๊ธฐ๋ฅ์ ์ ๊ณตํด ์ ์ฉํ ์ ๋ณด๋ฅผ ์ฝ๊ณ  ๋น ๋ฅด๊ฒ ์ฐพ์ ์ ์์ต๋๋ค.

## UI

### 1) ๋ก๊ทธ์ธ๊ณผ ํ์๊ฐ์

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302040-8d328600-e366-11eb-9cae-d94553871f1e.gif"/>
       <br><br>[๋ก๊ทธ์ธ]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125302045-8e63b300-e366-11eb-923a-dc3836caf8a3.gif"/>
       <br><br>[ํ์๊ฐ์] 
    </th>
  </tr>
</table>

- ๋ก๊ทธ์ธ/ํ์๊ฐ์ ์ฑ๊ณต ์ MainPage๋ก ๋์ด๊ฐ

### 2) Plan ์ถ๊ฐ/์์ /์ญ์ 

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302648-1b0e7100-e367-11eb-8520-fe011262dfdb.gif"/>
       <br><br>[Plan ์ถ๊ฐ]
     </th>
          <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302656-1c3f9e00-e367-11eb-99db-da2a8673778b.gif"/>
       <br><br>[Plan ์์ ]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125302664-1ea1f800-e367-11eb-8db7-b84722386b08.gif"/>
       <br><br>[Plan ์ญ์ ] 
    </th>
  </tr>
</table>

- Create plan ๋ฒํผ์ ๋๋ฅด๋ฉด ๊ณํ ์ถ๊ฐํ๊ณ  Plan Card ์ฐ์ธก ํ๋จ์ ์์  ์ญ์  ๋ฒํผ์ ํตํด ์์ /์ญ์ 
- ๋ชจ๋ฌ์ ํตํด ๊ณํ์ ์ถ๊ฐ ๋ฐ ์์ 
  - react-bootstrap ์ด์ฉ
- ์ญ์  ์ Alert์ ํตํด ํ๋ฒ ๋ ํ์ธํ ๋ค์ ์ญ์ 

### 3) Section ์ถ๊ฐ/์์ /์ญ์ 

<table>
   <tr>
     <th align="center">
       <img width="375" alt="1" src="https://user-images.githubusercontent.com/49552804/125302968-658fed80-e367-11eb-9a0e-e0b0fb7af01c.gif"/>
       <br><br>[Section ์ถ๊ฐ]
     </th>
          <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125302972-66c11a80-e367-11eb-95a2-0c1a65e40087.gif"/>
       <br><br>[Section ์์ ]
     </th>
  </tr>
</table>

- ์น์ ์ถ๊ฐ ๋ฒํผ์ ํตํด ์น์์ ์๋ก ์ถ๊ฐ
- ์น์ ์ ๋ชฉ ์์ dropdown ๋ฒํผ์ ํตํด ์น์ ์์ /์ญ์ 

### 4) Todo ์ถ๊ฐ/์์ /์ญ์ 

<table>
   <tr>
     <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125303924-21511d00-e368-11eb-976d-ef886763cfd5.gif"/>
       <br><br>[Todo ์ถ๊ฐ]
     </th>
        <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125303929-21e9b380-e368-11eb-815e-0c32a59972ea.gif"/>
       <br><br>[Todo ์์ ]
     </th>
          <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125303931-22824a00-e368-11eb-91d6-2e0d414fd50c.gif"/>
       <br><br>[Todo ์ญ์ ]
     </th>
  </tr>
</table>

- ํ  ์ผ ์ถ๊ฐ ๋ฒํผ ํด๋ฆญ ์ Todo title ์๋ ฅํ๊ณ  ์ถ๊ฐ
- ํด๋น TodoItem์ ๋ง์ฐ์ค hover ์ edit ๋ฒํผ ๋ธ์ถ๋๊ณ  ํด๋ฆญํ์ฌ Todo title ์์ 
- TodoItem์ ์ฒดํฌ ๋ฒํผ ๋๋ฅด๋ฉด TodoItem ์ญ์ 

### 5) Todo markdown ์ถ๊ฐ/์์ 

<table>
   <tr>
     <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125377541-25148c00-e3c8-11eb-8433-d6f12506941a.gif"/>
       <br><br>[markdown ์ถ๊ฐ]
     </th>
     <th align="center">
       <img width="375" height="250" alt="1" src="https://user-images.githubusercontent.com/49552804/125377538-247bf580-e3c8-11eb-958c-ec8cf05f17f7.gif"/>
       <br><br>[markdown ์์ ]
     </th>
  </tr>
</table>

- TodoItem ํด๋ฆญ ์ markdown ํธ์ง ๊ฐ๋ฅํ Modal์ฐฝ ์ถ๋ ฅ
- markdown์ ์ถ๊ฐํ๋ ค๋ฉด ์์  ๋ฒํผ์ ํด๋ฆญ ํ ๊ธฐ๊ฐ(๋ ์ง) ๋ฐ ๋ด์ฉ ์์ฑ
- markdown์ ์์ ํ๋ ค๋ฉด ์์  ๋ฒํผ์ ํด๋ฆญ ํ ๊ธฐ๊ฐ(๋ ์ง) ๋ฐ ๋ด์ฉ ์์ 
  - react-bootstrap ์ด์ฉ
  - react-datepicker ์ด์ฉ

### 6) Search

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125305240-28c4f600-e369-11eb-9a90-fe799833d488.gif"/>
       <br><br>[Section title ๊ฒ์]
     </th>
        <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125305243-29f62300-e369-11eb-88e4-f4ae0076242a.gif"/>
       <br><br>[์ค์๋ ๊ฒ์]
  </tr>
</table>

- Section search์์ Input ๊ฐ์ ๋ณํ๋ฅผ ์ค์๊ฐ์ผ๋ก ๊ฐ์งํ์ฌ ์๋ ฅ ์ฆ์ ๊ฒ์ ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์ด
- ์ค์๋(high/medium/easy/all) ๋ผ๋์ค ๋ฒํผ ํด๋ฆญ ์ ์น์ ๋ณ๋ก ํด๋น ์ค์๋์ TodoItem์ด ๋ธ์ถ

![npplansearch](https://user-images.githubusercontent.com/49552804/125305248-29f62300-e369-11eb-987c-8d4e3ea5eba3.gif)

- Plan search, Input ๊ฐ์ ๋ณํ๋ฅผ ์ค์๊ฐ์ผ๋ก ๊ฐ์งํ์ฌ ์๋ ฅ ์ฆ์ ๊ฒ์ ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์ด

## [ํ์ฉ ๊ธฐ์ ](https://github.com/leejy001/NPlan-app/wiki/%ED%99%9C%EC%9A%A9-%EA%B8%B0%EC%88%A0)

## [๊ฐ๋ฐ ์ผ์ง](https://github.com/leejy001/NPlan-app/wiki/%EA%B0%9C%EB%B0%9C-%EC%9D%BC%EC%A7%80)

## Todo

- [ ] DB ๊ตฌ์กฐ ์์ 
- [ ] Firebase functions ์ ์ฉ
- [ ] ํ์ ๊ธฐ๋ฅ ์ถ๊ฐ
