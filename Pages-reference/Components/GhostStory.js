import React, { Component } from "react";
import ReactMathJax from "react-mathjax2";
import ReactHtmlParser from "react-html-parser";
import "./css/screen.css";

class GhostStory extends Component {
	constructor(props) {
		super(props);
		this.base_url = window.ghost.url.api().replace(/\/ghost\/(.*?)$/, "");
	}

	componentWillMount() {
		let text = this.props.ghostText,
			html = "<h2>" + text.title + "</h2>" + text.html,
			mathHtml = html
				.replace(/\\\(/g, '<span class="MathJax">')
				.replace(/\\\)/g, "</span>")
				.replace(
					/\$\$(.*?)\$\$/g,
					'<span class="MathJaxFormula">$&</span>'
				)
				.replace(/\$\$/g, "")
				.replace(/\$(.*?)\$/g, '<span class="MathJax">$&</span>')
				.replace(/\$/g, ""),
			imgHtml = mathHtml.replace(
				/<img src="\/content\/images/gi,
				`<img src="http:${this.base_url}/content/images`
			);

		this.setState({
			html: imgHtml
		});
	}

	render() {
		let counter = 0;
		return (
			<div>
				{ReactHtmlParser(this.state.html, {
					transform: function(node) {
						if (
							node.type === "tag" &&
							node.attribs.class === "MathJax"
						) {
							// console.log(node.children[0].data);
							return (
								<ReactMathJax.Context
									input="tex"
									key={node.children[0].data}
									delay={300 + (counter += 20)}
									script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-AMS_SVG"
								>
									<ReactMathJax.Node inline>
										{node.children[0].data}
									</ReactMathJax.Node>
								</ReactMathJax.Context>
							);
						} else if (
							node.type === "tag" &&
							node.attribs.class === "MathJaxFormula"
						) {
							return (
								<span key={node.children[0].data}>
									<ReactMathJax.Context
										input="tex"
										key={node.children[0].data}
										delay={50 + (counter += 5)}
										script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-AMS_SVG"
										options={{
											// TeX: {
											// 	equationNumbers: {
											// 		autoNumber: "all"
											// 	}
											// },
											SVG: {
												linebreaks: {
													automatic: true,
													width: "90% container"
												}
											}
										}}
									>
										<span key={node.children[0].data}>
											<ReactMathJax.Node>
												{node.children[0].data}
											</ReactMathJax.Node>
										</span>
									</ReactMathJax.Context>
								</span>
							);
						} else if (
							node.type === "text" &&
							node.parent !== null &&
							(node.parent.attribs.class === "MathJax" ||
								node.parent.attribs.class === "MathJaxFormula")
						) {
							return null;
						}
					}
				})}
			</div>
		);
	}
}

export default GhostStory;
