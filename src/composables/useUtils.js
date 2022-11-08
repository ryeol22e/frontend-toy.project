export const useUtils = ()=> {
	const useIsEmpty = (data)=> {
		let bool = true;
		// true : 비었다, false : 데이터가 있다.
		if(data!==undefined) {
			if(data!==null) {
				switch(data.constructor) {
					case String:
						if(data.replace(/[\s|\t]/gi, '').length>0) {
							bool = false;
						}
						break;
					case Array:
						if(data.length>0) {
							bool = false;
						}
						break;
					case Object:
						if(Object.keys(data).length>0) {
							bool = false;
						}
						break;
				}
			}
		}

		return bool;
	};

	return {
		useIsEmpty,
	};
};