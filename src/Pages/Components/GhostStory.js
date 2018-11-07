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
				.replace(
					/\$(.*?)\$/g,
					'<span class="MathJax">$&</span>'
				)
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
									delay={400}
									options={{
										CommonHTML: {
											scale: 100
										},
										preview: "none"
									}}
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
										delay={200}
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
