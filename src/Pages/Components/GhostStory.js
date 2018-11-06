import React, { Component } from "react";
import MathJax from "react-mathjax2";
import ReactHtmlParser from "react-html-parser";
import "./css/screen.css";

class GhostStory extends Component {
	constructor(props) {
		super(props);
		this.base_url = window.ghost.url.api().replace(/\/ghost\/(.*?)$/, "");
	}
	componentDidMount() {
		// MathJax.Hub.Queue(MathJax.Hub.Typeset());
	}
	render() {
		let text = this.props.ghostText,
			html,
			mathHtml,
			imgHtml;
		// console.log("texts",this.texts);
		html = "<h2>" + text.title + "</h2>" + text.html;

		mathHtml = html
			.replace(/\\\(/g, '<span class="MathJax">')
			.replace(/\\\)/g, "</span>")
			.replace(/\$\$(.*?)\$\$/, '<span class="MathJaxFormula">$&</span>')
			.replace(/\$/g, "");

		imgHtml = mathHtml.replace(
			/<img src="\/content\/images/gi,
			`<img src="http:${this.base_url}/content/images`
		);

		return (
			<div>
				{ReactHtmlParser(imgHtml, {
					transform: function(node) {
						if (
							node.type === "tag" &&
							node.attribs.class === "MathJax"
						) {
							// console.log(node.children[0].data);
							return (
								<MathJax.Context
									input="tex"
									key={node.children[0].data}
									options={{
										CommonHTML: {
											scale: 100
										}
									}}
								>
									<MathJax.Node inline>
										{node.children[0].data}
									</MathJax.Node>
								</MathJax.Context>
							);
						} else if (
							node.type === "tag" &&
							node.attribs.class === "MathJaxFormula"
						) {
							return (
								<span key={node.children[0].data}>
									<MathJax.Context
										input="tex"
										key={node.children[0].data}
									>
										<span key={node.children[0].data}>
											<MathJax.Node>
												{node.children[0].data}
											</MathJax.Node>
										</span>
									</MathJax.Context>
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
