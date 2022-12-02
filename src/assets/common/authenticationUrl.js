export default (path)=> {
	let boolResult = false;
	const parameter = String(path);
	const pathList = [
		'/boards/community/**',
		'/boards/regist/**',
		
	];

	for(let i=0, size=pathList.length ; i<size ; i++) {
		const authUrl = pathList[i];
		
		if(authUrl===parameter) {
			boolResult = true;
		} else {
			if(authUrl.includes('*')) {
				const authPrefixPath = authUrl.substring(0, authUrl.lastIndexOf('/*'));
				
				if(authPrefixPath===parameter) {
					boolResult = true;
					break;
				} else {
					let boolAuth = false;
					const authArr = authUrl.split('/').filter(path=> path!=='');
					const checkArr = parameter.split('/').filter(path=> path!=='');
	
					for(let j=0, size=checkArr.length ; j<size ; j++) {
						const authPath = authArr[j] || '';
						const checkPath = checkArr[j] || '';
						
						if(authPath.includes('*') && checkPath!=='') {
							const authLastPath = authUrl.substring(authUrl.lastIndexOf('/')+1, authUrl.length) || '';

							if(authLastPath.includes('*')) {
								boolAuth = true;
								break;
							} else {
								const authLastPath = authUrl.substring(authUrl.lastIndexOf('/')+1, authUrl.length) || '';
								const checkLastPath = parameter.substring(parameter.lastIndexOf('/')+1, parameter.length) || '';

								if(authLastPath===checkLastPath) {
									boolAuth = true;
									break;
								} else {
									boolAuth = false;
									continue;
								}
							}
						}
						
						if(!authPath.includes('*')) {
							if(authPath===checkPath) {
								boolAuth = true;
								continue;
							} else {
								boolAuth = false;
								break;
							}
						}
					}
					
					if(boolAuth) {
						boolResult = true;
						break;
					}
				}
			}
		}
	}

	return boolResult;
};