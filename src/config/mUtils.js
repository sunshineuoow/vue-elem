/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if(!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if(!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
	let target;
	if(attr === 'scrollTop') {
		target = element.scrollTop;
	} else if(element.currentStyle) {
		target = element.currentStyle[attr];
	} else {
		target = document.defaultView.getComputedStyle(element,null)[attr];
	}
	return NumberMode == 'float'? parseFloat(target) : parentInt(target);
}

/**
 * 页面直达底部
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
	let requestFram;
	let oldScrollTop;

	document.body.addEventListener('scroll', () => {
		loadMore();
	},false)

	element.addEventListener('touchstart', () => {
		height = element.offsetHeight;
		setTop = element.offsetTop;
		paddingBottom = getStyle(element, 'paddingBottom');
		marginBottom = getStyle(element, 'marginBottom');
	},{passive: true})

	element.addEventListener('touchmove', () => {
		loadMore();
	},{passive: true})

	element.addEventListener('touchend', () => {
		oldScrollTop = document.body.scrollTop;
		moveEnd();
	},{passive: true})

	const moveEng = () => {
		requestFram = requsetAnimationFrame(() => {
			if (document.body.scrollTop != oldScrollTop) {
				oldScrollTop = document.body.scrollTop;
				loadMore();
				moveEnd();
			} else {
				cancelAnimationFrame(requestFram);
				height = element.offsetHeight;
				loadMore();
			}
		})
	}

	const loadMore = () => {
		if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
			callback();
		}
	}
}