# A07 FakeDB I

## Tasks

오늘의 blueprint에는 movieController.js파일이 있습니다. 여러분은 이 파일에서 함수 3개를 찾을 수 있습니다. 오늘 과제는 이 세 가지 함수를 완성하는 것입니다!

- home: 모든 영화가 나열되어야 합니다.
- movieDetail: :id에 따라 영화의 정보를 보여줘야 합니다.
- filterMovie: rating 혹은 year에 따라 영화를 필터링해야 합니다.
- 이미 여러분을 위해 만들어진 db.js 파일이 있는데, 이 파일은 건드릴 필요가 없습니다. db.js 파일은 아래의 함수를 내보냅니다(export).

- getMovieById: ID로 영화를 찾는 함수
- getMovies: DB에 있는 모든 영화를 배열(array)로 반환하는 함수
- getMovieByMinimumRating: X보다 큰 등급의 영화를 배열로 반환하는 함수
- getMovieByMinimumYear: X 년 이후 개봉한 영화를 배열로 반환하는 함수

여러분은 movieRouter.js 파일도 완성해야 합니다. 세 가지 URL(/, /:id, /filter)을 만드세요. views 폴더도 비어 있습니다. 영화를 보여주기 위해 partials, layouts, mixins 을 만드세요. 최종 결과물은 이렇게 작동해야 합니다:
