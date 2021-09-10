let intersectionObserver;

function initializeIntersectionObserver() {
	intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			let eventName = entry.isIntersecting ? 'viewport-enter' : 'viewport-exit';
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	});
}

export default function viewport(node) {
	if (!intersectionObserver) {
		initializeIntersectionObserver();
	}
	intersectionObserver.observe(node);
	return {
		destroy() {
			intersectionObserver.unobserve(node);
		}
	};
}
