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
	/**
	 * document.cookie object로 convert
	 * @returns 
	 */
	const getCookieObject = ()=> {
		const list = document.cookie.split('; ');
		const object = new Object();

		list.forEach(item=> {
			const key = item.substring(0, item.indexOf('='));
			const value = item.substring(item.indexOf('=')+1, item.length);

			object[key] = value;
		});

		return object;
	};
	const useCookie = {
		/**
		 * cookie 추가
		 * @param {} key 
		 * @param {*} value 
		 */
		setCookie(key, value) {
			if(key===undefined || key===null || key==='') {
				throw 'parameter error.';
			} else if(value===undefined || value===null || value==='') {
				throw 'parameter error.';
			}
			
			document.cookie = key.concat('=').concat(value);
		},
		/**
		 * cookie 특정 값 반환
		 * @param {*} key 
		 * @returns 
		 */
		getCookie(key) {
			const object = getCookieObject();
			let value = null;
	
			if(object.hasOwnProperty(key)) {
				value = object[key];
			}
			return value || '';
		},
			/**
		 * cookie 삭제
		 * @param {*} key 
		 */
		deleteCookie(key) {
			const object = getCookieObject();
	
			if(key.constructor!==String) {
				throw 'parameter is not String.';
			}
	
			document.cookie = key.concat('=; expires=').concat(new Date('1970/01/01').toString()).concat('; ');
		},
	};

	return {
		useIsEmpty,
		useCookie,
	};
};