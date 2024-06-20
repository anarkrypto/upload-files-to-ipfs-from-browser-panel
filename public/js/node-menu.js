document.querySelectorAll(".tab a").forEach(function (element) {
	element.addEventListener("click", function (e) {
		e.preventDefault();

		var parent = element.parentElement;
		parent.classList.add("active");
		Array.from(parent.parentElement.children).forEach(function (sibling) {
			if (sibling !== parent) {
				sibling.classList.remove("active");
			}
		});

		var target = document.querySelector(element.getAttribute("href"));
		document.querySelectorAll(".tab-content > div").forEach(function (div) {
			if (div !== target) {
				div.style.display = "none";
			}
		});

		target.style.display = "block";
		target.style.opacity = 0;
		var fadeEffect = setInterval(function () {
			if (target.style.opacity < 1) {
				target.style.opacity = parseFloat(target.style.opacity) + 0.1;
			} else {
				clearInterval(fadeEffect);
			}
		}, 60);
	});
});
