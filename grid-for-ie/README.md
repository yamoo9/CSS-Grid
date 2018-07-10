# IE를 위한 CSS Grid ProjectKit

웹 레이아웃 디자인의 새로운 시대를 개쳑하고 있는 CSS Grid는 최첨단 기술로 강력하고 매력적입니다.
Grid를 사용하면 더 이상 무거운 Grid 라이브러리나 프레임워크 등을 사용하지 않고도 멋진 레이아웃을 구현할 수 있습니다.

하지만 안타깝게도 Grid 기술에 익숙하지 않거나, 오래된 브라우저를 프로젝트에 고래해야 함에 따라 사용을 기피하기도 합니다.
다행히도 PostCSS, Autoprefixer와 같은 도구를 프로젝트에 사용하면, 오래된 브라우저에서도 Grid를 사용할 수 있습니다.

## 브라우저 호환

프로젝트 키트를 사용해 개발할 경우, 별도의 Grid 대체 문법을 사용할 필요 없이 **IE 10+ 지원** 합니다.

## 개발 환경

ProjectKit을 구동하기 위한 개발 환경 구성을 위해 사용자의 운영체제에 설치되어 있어야 할 것은 다음과 같습니다.

- [Node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com)

#### yarn 설치

NPM 설치 명령을 사용해 yarn 패키지를 전역 설치합니다.

```sh
$ npm install --global yarn
```

## CLI 명령어

#### 개발 (Development)

개발을 위한 라이브 서버를 구동합니다. (파일 수정 저장 시, 자동 업데이트)

```sh
$ yarn dev
```

#### 빌드 (Build)

배포를 위한 빌드 프로세스를 처리합니다. (코드 최적화)

```sh
$ yarn build
```

## 환경 설정

#### Autoprefixer 설정

IE에서 CSS Grid 사용을 위한 접두사(Prefix)를 자동으로 붙이도록 설정합니다. 접두사 설정을 위한 브라우저 범위는 `browsers` 속성에 배열 값으로 설정할 수 있습니다.

```js
module.exports = {

  // CSS Grid: IE 브라우저 지원 설정
  grid: true,

  // Vendor Prefix 처리 범위 설정
  browsers: [
    "> 1% in KR",
    "ie >= 10"
  ],

};
```

#### CSS Nano 설정

CSS 코드를 최적화(압축) 할 때 주석을 모두 제거하도록 설정합니다.

```js
module.exports = {
  preset: [
    "default",
    // 기본 설정 덮어쓰기
    {
      // 주석 제거 설정
      discardComments: { removeAll: true }
    }

  ]
};

```


## 레퍼런스

#### PostCSS & 플러그인

ProjectKit에 사용된 도구 정보를 확인할 수 있습니다.

- [postcss-cli](https://github.com/postcss/postcss-cli)
- [autoprefixer](https://github.com/postcss/autoprefixer#cli)
- [browserlist](https://github.com/browserslist/browserslist#full-list)
- [cssnano](https://cssnano.co)
- [live-server](https://www.npmjs.com/package/live-server)


#### 브라우저 이용 현황

오늘 날 국내외 브라우저 별 사용자 이용 현황을 확인할 수 있습니다.

- [koreanhtml5.kr](https://goo.gl/oPDjuz)
- [internettrend.co.kr](https://goo.gl/PRRKvk)


## IE × CSS Grid 속성 호환성 표

Autoprefixer 도구가 상당 부분 자동으로 호환 가능한 코드로 변경해주지만, 현 시점에서 만능은 아닙니다.
**프로젝트에 IE를 반영한다면 다음 표를 참고해 사용 가능한 속성과 그렇지 않은 속성을 구분해야 합니다.**

CSS Grid 속성 | IE 문법 | Autoprefixer | 설명
----------------------|-----------------------|--------------|-------------------------------------------------------------------
grid-template-rows | -ms-grid-rows | **OK** |
grid-template-columns | -ms-grid-columns | **OK** |
grid-template-areas | NA | **OK** |
grid-template | NA | **OK** | `grid-template` 속기형 속성
grid-row-start | -ms-grid-row | **OK<sup>1</sup>** | `span` 문법에서 `grid-row-end` 속성 정의 필요
grid-column-start | -ms-grid-column | **OK<sup>1</sup>** | `span` 문법에서 `grid-column-end` 속성 정의 필요
grid-row-end | NA | **OK<sup>1</sup>** | `grid-row-start` 속성 정의 필요
grid-column-end | NA | **OK<sup>1</sup>** | `grid-column-start` 속성 정의 필요
grid-row | NA | **OK<sup>1</sup>** |
grid-column | NA | **OK<sup>1</sup>** |
grid-area | NA | **OK<sup>2</sup>** | Autoprefixer `row`/`column` 좌표로 변경 처리
grid-row-gap | NA | **OK<sup>3</sup>** | IE에서 여분의 `rows`/`columns`을 생성
grid-column-gap | NA | **OK<sup>3</sup>** | IE에서 여분의 `rows`/`columns`을 생성
grid-gap | NA | **OK<sup>3</sup>** | IE에서 여분의 `rows`/`columns`을 생성
align-self | -ms-grid-row-align | **OK** |
justify-self | -ms-grid-column-align | **OK** |
grid-auto-rows | NA | NO | IE는 auto-placement를 미지원
grid-auto-columns | NA | NO | IE는 auto-placement를 미지원
grid-auto-flow | NA | NO | IE는 auto-placement를 미지원
grid | NA | NO | 현재 지원되지 않는 이유는 [GitHub 이슈](https://github.com/postcss/autoprefixer/issues/1023)를 참고
NA | -ms-grid-row-span | **OK** | `grid-row-end`, `grid-area` 속성 사용 시, 처리
NA | -ms-grid-column-span | **OK** | `grid-column-end`, `grid-area` 속성 사용 시, 처리

<br>

**주의!**<br>
1. Autoprefixer는 음수 값의 경우, 프리픽스를 붙이지 않습니다.
2. 각 그리드 아이템 요소는 고유한 영역 이름을 가져야 합니다.
3. Autoprefixer는 `grid-template-columns`, `grid-template-areas` 속성이<br>
   모두 정의되어 있어야 `grid-gap` 속성에 프리픽스를 붙입니다. 뿐만 아니라,<br>
   미디어 쿼리를 통해 `grid-gap`을 상속받을 수도 없습니다.