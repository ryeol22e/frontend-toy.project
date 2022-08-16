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
		component : ()=> import('@/views/board/BoardRegist'),
		meta : {
			title : 'Q&A 등록',
		}
	},
	{
		path : '/boards/community',
		name : 'CommunityBoardList',
		component : ()=> import('@/views/board/community/CommBoardList'),
	},
	{
		path : '/boards/community/:boardSeq',
		name : 'CommBoardDetail',
		component : ()=> import('@/views/board/community/CommBoardDetail'),
	},
	{
		path : '/boards/qna',
		name : 'QnABoardList',
		component : ()=> import('@/views/board/qna/QnABoardList'),
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
		component : ()=> import('@/views/board/qna/QnABoardDetail'),
		meta : {
			title : 'Q&A - '
		}
	}
]