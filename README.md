# 프로젝트명: 인스타그램(모바일)

## :muscle: STACK

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Google](https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

> React Native를 사용한 프론트 엔드 기능구현
>
> Styled-components를 사용한 스타일링
>
> GraphQL, Apollo,Prisma를 사용한 백엔드 구현
>
> JWT, Passport를 사용한 인증 기능구현
>
> Navigator를 사용한 화면구성
>
> expo를 사용
>
> Google api
>
> S3에 업로드

## :large_blue_circle: 기능

✅JWT,Passport를 통한 로그인,회원가입
✅구글아이디로 회원가입
✅Local Storage저장으로 접속시 마다 로그인 불필요
✅작성된 포스터 게시물 보기
✅팔로잉한 유저의 포스터 게시물 보기
✅좋아요하기, 좋아요 카운트
✅댓글보기 및 작성(Modal)
✅프로필 보기
✅정면,후면 사진찍기
✅사진 업로드하기
✅Pc version 인스타와 연동

## :red_circle: PRIVIEW

![img.gif](readmeGif/gif.gif)
![img.gif](readmeGif/png1.png)
![img.gif](readmeGif/png2.gif)

## :large_blue_circle: 설명

```
인스타그램 PC 웹사이트 입니다. 기본적으로 실제 인스타PC버전과 유사합니다.
회원가입은 입력한 해당 메일로 랜덤한 비밀번호가 발송되며,
회원가입후 인증여부를 거쳐 로그인을 하게 됩니다. 이후 로그인의 정보는 저장됩니다.
PC버전과 동일하게 웹사이트에서는 기본적으로 포스트를 작성 할 수 없습니다.
팔로잉과 팔로워를 할수 있으며, 여부에 따라서 해당 유저의 포스트를 스크롤형태로
열람가능 하게 하였습니다.
좋아요 또한 구현하여 카운트 횟수가 증가하게 하였습니다.
댓글 기능 또한 구현하여 해당 댓글의 숫자와 댓글을 클릭시, 모달창을 통하여
해당 포스트의 내용과, 댓글을 볼 수 있습니다.
유저의 아바타, 혹은 이름을 클릭하여 해당유저의 포스터들을 열람하실 수 있습니다.
전체적으로 구성은 React로 구현하였으며, Apollo GraphQL을 사용하여, 백엔드 서버와
DB를 구현하였습니다.
배포는 프론트정보는 netlify를 통해서 구현하였고, 최종적으로 heroku를 통해서 빌드 하였습니다.
```
