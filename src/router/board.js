export default [
	// {
	// 	path : '/boards/qna',
	// 	name : 'QnA',
	// 	component : ()=> import('@/views/board/QnABoard'),
	// 	meta : {
	// 		title : 'Q&A',
	// 	}
	// },
	{
		path : '/boards/regist/:type',
		name : 'BoardRegist',
		component : ()=> import('@/views/board/BoardRegist.vue'),
		meta : {
			title : 'Q&A 등록',
		}
	},
	{
		path : '/boards/community',
		name : 'CommunityBoardList',
		component : ()=> import('@/views/board/community/CommBoardList.vue'),
	},
	{
		path : '/boards/community/:boardSeq',
		name : 'CommBoardDetail',
		component : ()=> import('@/views/board/community/CommBoardDetail.vue'),
	},
	{
		path : '/boards/qna',
		name : 'QnABoardList',
		component : ()=> import('@/views/board/qna/QnABoardList.vue'),
		meta : {
			title : 'Q&A',
		},
		// children : [
		// 	{
		// 		path : ':seq',
		// 		component : ()=> import('@/views/board/QnABoardDetail'),
		// 		meta : {
		// 			title : 'Q&A - 상세욧!'
		// 		}
		// 	}
		// ],
	},
	{
		path : '/boards/qna/:boardSeq',
		name : 'QnABoardDetail',
		component : ()=> import('@/views/board/qna/QnABoardDetail.vue'),
		meta : {
			title : 'Q&A - '
		}
	}
]