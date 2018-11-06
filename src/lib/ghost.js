import * as axios from "axios";

class Ghost {
	constructor() {
		this.texts = [];
		this.langs = {
			ru: [],
			en: []
		};
		this.base_url = "";
		this.init = this.init.bind(this);
		// this.get = this.get.bind(this);
		this.getText = this.getText.bind(this);
	}

	init() {
		let self = this;

		window.ghost.init({
			clientId: "ghost-frontend",
			clientSecret: "8dcccc90d02c"
		});

		this.base_url = window.ghost.url.api().replace(/\/ghost\/(.*?)$/, "");
		
		return new Promise(function(resolve, reject) {
			axios
				.get(
					window.ghost.url.api("posts", {
						include: "tags",
						filter: "tag:magnetosphere-ru"
					})
				)
				.then(
					function(response) {
						self.texts = response.data.posts.map(function(post) {
							return {
								html: post.html,
								title: post.title,
								tags: post.tags.map(function(tag) {
									return tag.name;
								})
							};
						});
						self.texts.forEach(function(text) {
							let ru = text.tags.includes("ru"),
								en = text.tags.includes("en");
							if (ru) {
								self.langs.ru.push(text);
							} else if (en) {
								self.langs.en.push(text);
							}
						});
						// console.log(self.texts);
						// console.log(self.langs);
						resolve();
					},
					function(error) {
						resolve();
					}
				);
		});
	}

	getText(tag, lang) {
		let texts = this.langs[lang],
			findedTexts = texts.filter(function(text) {
				return text.tags.includes(tag);
			});

		if (findedTexts.length > 0) {
			return {
				title: findedTexts[0].title,
				html: findedTexts[0].html
			};
		} else {
			return {
				title: "There is no text for this page.",
				html: ""
			};
		}
	}
}

let ghost = new Ghost();

export default ghost;

