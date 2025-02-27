document.addEventListener("DOMContentLoaded", function () {
	let pagecontentthingy = document.documentElement.innerHTML;
	var url = window.location;
	let params = new URLSearchParams(url.search);
	console.log("Using Beta Branch: " + params.has("beta"));
	console.log("Using Raw Branch: " + params.has("raw"));
	if (params.has("beta")) {
		let pageName;
		if (params.get("beta")) {
			pageName = params.get("beta");
		} else {
			let path = window.location.pathname;
			pageName = path.substring(path.lastIndexOf("/") + 1);
		}
		const fetchstring =
			"https://raw.githubusercontent.com/whytechcpu/Purgatory-Nexus-Wiki/refs/heads/main/pages/" +
			pageName +
			".html";
		fetch(fetchstring)
			.then((response) => response.text())
			.then((html) => {
				pagecontentthingy = html;
				window.pagedata = pagecontentthingy;
			})
			.catch((error) =>
				console.error("Error loading the template:", error),
			);
	}
	if (!params.has("raw")) {
		window.pageLoaded = false;
		window.pagedata = pagecontentthingy;
		document.body.style.display = "none";
		fetch("/purgatory/page.html")
			.then((response) => response.text())
			.then((html) => {
				document.documentElement.innerHTML = html;

				let scripts = document.querySelectorAll("script");
				scripts.forEach((script) => {
					let newScript = document.createElement("script");
					newScript.textContent = script.textContent;
					document.body.appendChild(newScript);
					script.remove();
				});

				window.pageLoaded = true;
				document.body.style.display = "block";
				document.dispatchEvent(new Event("pageLoaded"));
			})
			.catch((error) =>
				console.error("Error loading the template:", error),
			);
	} else {
		document.body.style.display = "block";
		document.body.style.backgroundColor = "white";
		let code = document.createElement("p");
		code.textContent = pagecontentthingy;
		document.body.appendChild(code);
	}
});
