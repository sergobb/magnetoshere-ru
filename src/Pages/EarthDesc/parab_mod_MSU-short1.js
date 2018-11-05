import React from "react";
import image1 from "./parab_mod_MSU-short_html_6c7b849a45546b80.png";
import image2 from "./parab_mod_MSU-short_html_58b286e271022742.png";
import { Trans } from "@lingui/macro";
import MathJax from "react-mathjax2";
// <MathJax.Context input='tex'>
// <MathJax.Text text="MathJAX test: \(B_m=B_{sd}+B_t+B_r+B_{sr}+B_{fac}\)"/>
// </MathJax.Context>

import ReactHtmlParser from "react-html-parser";
// import * as axios from "axios";

// window.ghost.init({
// 	clientId: "ghost-frontend",
// 	clientSecret: "28f34149a037"
// });

// axios
// 	.get(
// 		window.ghost.url.api("posts", {
// 			include: "tags",
// 			filter: "tag:magnetosphere-ru"
// 		})
// 	)
// 	.then(function(response) {
// 		console.log(response.data);
// 	});

let Dsc =
	'<h1>Paraboloid model description</h1><p> Paraboloid model represents the magnetic fields in the Earth\'s magnetosphere as a superposition of the ring current \\(B_r\\), of the tail current including the closure currents on the magnetopause \\(B_t\\), of the Region 1 field-aligned currents \\(B_{fac}\\), of the magnetopause currents screening the dipole field \\(B_{sd}\\) and of the magnetopause currents screening the ring current \\(B_{sr}\\):</p><p>$$B_m=B_{sd}(\\Psi, R_1) +B_t(\\Psi, R_1, R_2,\\Phi_{\\infty})+B_r(\\Psi, b_r) + B_{sr}(\\Psi, R_1, b)+B_{fac}(I_{||})$$</p><p>The mathematical description of the model is published in [Alexeev et al., 2003]. The model is not connected with some database which imposes the limitations on the model’s region of validity, so it can describe the magnetic field during quiet as well as disturbed and extremely disturbed periods. The storm-time dynamics of the magnetosphere is represented as temporal variations of the large-scale current systems.</p><p>The model input are key parameters of the magnetospheric current systems, which represent their location and intensity:</p><ul><li>the geomagnetic dipole tilt angle \\(\\Psi\\);</li><li>the magnetopause stand-off distance \\(R_1\\);</li><li>the distance to the inner edge of the tail current sheet \\(R_2\\);</li><li>the magnetic flux through the tail lobes \\(\\Phi_{\\infty}\\);</li><li>the ring current magnetic field at the Earth\'s center \\(b_r\\);</li><li>the maximum intensity of the field-aligned current \\(I_{||}\\).</li></ul><figure class="kg-card kg-gallery-card kg-width-wide"><div class="kg-gallery-container"><div class="kg-gallery-row"><div class="kg-gallery-image"><img src="/content/images/2018/11/parab_mod_MSU-short_html_6c7b849a45546b80.png" width="574" height="605"></div><div class="kg-gallery-image"><img src="/content/images/2018/11/parab_mod_MSU-short_html_58b286e271022742.png" width="609" height="605"></div></div></div></figure><p>The solar wind driving of the magnetospheric magnetic field is realized through the dependence of the model parameters on empirical data (solar wind plasma parameters, IMF, AL and Dst). The model input parameters can be calculated using so-called <em>submodels (</em>see [<em>Alexeev et al., 1996; Alexeev et al., 2003</em>]). <em>Submodels</em>, can be changed while the magnetic filed calculated by the model remains to be satisfying the boundary conditions. Such three-level structure of the model (data – parameters – magnetic field) allows flexible taking into account the data availability changing the “data-parameters” calculation scheme (changing the <em>submodels</em>).</p><p><strong>Bibliography</strong></p><ol><li>Alexeev I.I., E.S.Belenkaya, S.Y.Bobrovnikov, V.V.Kalegaev, Modelling of the electromagnetic field in the interplanetary space and in the Earth\'s magnetosphere, Space Science Rev., <strong>107</strong>, 7 (2003).</li><li>Alexeev I. I., Belenkaya E. S., Kalegaev V. V., Feldstein Y. I., Grafe A., Magnetic storms and magnetotail currents, J. Geophys. Res., <strong>101</strong>, 7737 (1996).</li><li>Alexeev I. I., Feldstein Y. I., Modelling of geomagnetic field during magnetic storms and comparison with observations, Journ. Atm. Sol.-Terr. Phys., 63, 431 (2001).</li><li>Alexeev I.I.. Kalegaev V.V., Belenkaya E.S., Bobrovnikov S.Yu., Feldstein Ya.I., Gromova L.I., The Model Description of Magnetospheric Magnetic Field in the Course of Magnetic Storm on January 9-12, 1997, J. Geophys. Res.,<strong>106</strong>, 25683 (2001).</li><li>Belenkaya E.S., I.I.Alexeev, and C.R.Clauer, Field-aligned current distribution in the transition current system, Journal of Geophys. Res., 109, A11207, doi:10.1029/2004JA010484, 2004.</li><li>Burton R. K., McPherron R. L., Russell C. T., An empirical relationship between interplanetary conditions and Dst, J. Geophys. Res., <strong>80</strong>, 4204 (1975).</li><li>Kalegaev V.V., Ganushkina N. Yu., Global magnetospheric dynamics during magnetic storms of different intensities. AGU Monograph "Physics and Modeling of the Inner Magnetosphere", 293, (2005).</li><li>Kalegaev V. V., Ganushkina N. Yu., Pulkkinen T. I., Kubyshkina M. V., Singer H. J., Russell C. T., Relation between the ring current and the tail current during magnetic storms, Ann. Geoph. <strong>26</strong>, 523 (2005).</li><li>V.V. Kalegaev, E.V. Makarenkov, Storm-time ring and tail current dynamics under extremely disturbed conditions, Journ. of Atm. and Sol.-Terr. Phys., 70, 519 (2008), doi:10.1016/j.jastp.2007.08.029.</li><li>O’Brien T. P., McPherron R. L., An empirical phase space analysis of ring current dynamics: Solar wind control of injectionand decay, J. Geophys. Res., <strong>105</strong>, 7707 (2000).</li><li>Shue J.-H., Song P., Russel C. T., Steinberg J .T., Chao J. K., Zastenker G., Vaisberg O. L., Kokubun S., Singer H. S., Detman T. R., Kawano H., Magnetopause location under extreme solar wind conditions, J. Geophys. Res., 103,17691-17700, 1998.</li><li>Starkov, G.V., Planetary morphology of the aurora, In <em>Magnetosphere-Ionosphere Physics</em>, S.-Petersburg: Nauka, 85-90, 1993.</li></ol>';

let Desc = `
	
		<center>
			<h2>
				Paraboloid model description
			</h2>
		</center>
			<p align="justify">
				Paraboloid model represents the magnetic fields in the Earth's
				magnetosphere as a superposition of the ring current
				<i>
					B<sub>r</sub>
				</i> \\(B_r\\)
				, of the tail current including the closure currents on the
				magnetopause
				<i>
					B<sub>t</sub>
				</i>
				, of the Region 1 field-aligned currents
				<i>
					B<sub>fac</sub>
				</i>
				, of the magnetopause currents screening the dipole field
				<i>
					B<sub>sd</sub>
				</i>
				and of the magnetopause currents screening the ring current
				<i>
					B<sub>sr</sub>
				</i>
				:
			</p>

			<p align="center">
				$$B_m=B_{sd}+B_t+B_r+B_{sr}+B_{fac}$$
				<br />
				<i>
					B<sub>m</sub> = B<sub>sd</sub>
					(&Psi;, R<sub>1</sub>) + B<sub>t</sub>
					(&Psi;, R<sub>1</sub>, R<sub>2</sub>, &Phi;
					<sub>&infin;</sub>) + B<sub>r</sub>
					(&Psi;, b<sub>r</sub>) + B<sub>sr</sub>
					(&Psi;, R<sub>1</sub>, b) + B<sub>fac</sub>
				</i>
				(I) (1)
				<br />
			</p>

			<p align="justify">
				The mathematical description of the model is published in
				[Alexeev et al., 2003]. The model is not connected with some
				database which imposes the limitations on the model’s region of
				validity, so it can describe the magnetic field during quiet as
				well as disturbed and extremely disturbed periods. The
				storm-time dynamics of the magnetosphere is represented as
				temporal variations of the large-scale current systems.
			</p>
			<p>
				<br />
			</p>
			<p align="justify">
				The model input are key parameters of the magnetospheric current
				systems, which represent their location and intensity:
			</p>
			<ul>
				<li>
					the geomagnetic dipole tilt angle <i>&Psi;</i>;
				</li>
				<li>
					the magnetopause stand-off distance
					<i>
						R<sub>1</sub>
					</i>
					;
				</li>
				<li>
					the distance to the inner edge of the tail current sheet
					<i>
						R<sub>2</sub>
					</i>
					;
				</li>
				<li>
					the magnetic flux through the tail lobes
					<i>
						&Phi;
						<sub>&infin;</sub>
					</i>
					;
				</li>
				<li>
					the ring current magnetic field at the Earth's center
					<i>
						b<sub>r</sub>
					</i>
					;
				</li>
				<li>
					the maximum intensity of the field-aligned current <i>I</i>.
				</li>
			</ul>
			<p align="justify">
				<br />
			</p>
			<center>
				<table width="592">
					<tbody>
						<tr>
							<td width="578" valign="top">
								<p>
									<img
										src={image1}
										alt="Paramod"
										name="Image1"
										width="269"
										height="283"
										border="0"
									/>
									<img
										src={image2}
										alt="Paramod"
										name="Image2"
										width="282"
										height="280"
										border="0"
									/>
								</p>
							</td>
						</tr>
						<tr>
							<td width="578" valign="top">
								<p align="justify">
									<font size="2">
										<i>
											The magnetic field structure in the
											noon-midnight magnetosphere
											cross-section on Jan 9, 1997,
											UT=12:00 and Jan 10, 1997, UT=10:00.
										</i>
									</font>
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</center>
			<p align="justify">
				<br />
			</p>
			<p align="justify">
				The solar wind driving of the magnetospheric magnetic field is
				realized through the dependence of the model parameters on
				empirical data (solar wind plasma parameters, IMF, AL and Dst).
				The model input parameters can be calculated using so-called
				<i>submodels (</i>
				see
				<i> </i>[<i>Alexeev et al., 1996; Alexeev et al., 2003</i>
				]).
				<i>Submodels</i>, can be changed while the magnetic filed
				calculated by the model remains to be satisfying the boundary
				conditions. Such three-level structure of the model (data –
				parameters – magnetic field) allows flexible taking into account
				the data availability changing the “data-parameters” calculation
				scheme (changing the
				<i>submodels</i>
				).
			</p>
			<p>
				<br />
			</p>
			<p align="justify">
				<br />
			</p>
			<p align="justify">
				<b>Bibliography</b>
			</p>
			<p align="justify">
				<br />
			</p>
			<ol>
				<li>
					Alexeev I.I., E.S.Belenkaya, S.Y.Bobrovnikov, V.V.Kalegaev,
					Modelling of the electromagnetic field in the interplanetary
					space and in the Earth's magnetosphere, Space Science Rev.,
					<b>107</b>, 7 (2003).
				</li>
				<li>
					Alexeev I. I., Belenkaya E. S., Kalegaev V. V., Feldstein Y.
					I., Grafe A., Magnetic storms and magnetotail currents, J.
					Geophys. Res., <b>101</b>, 7737 (1996).
				</li>
				<li>
					Alexeev I. I., Feldstein Y. I., Modelling of geomagnetic
					field during magnetic storms and comparison with
					observations, Journ. Atm. Sol.-Terr. Phys., 63, 431 (2001).
				</li>
				<li>
					Alexeev I.I.. Kalegaev V.V., Belenkaya E.S., Bobrovnikov
					S.Yu., Feldstein Ya.I., Gromova L.I., The Model Description
					of Magnetospheric Magnetic Field in the Course of Magnetic
					Storm on January 9-12, 1997, J. Geophys. Res.,
					<b>106</b>, 25683 (2001).
				</li>
				<li>
					Belenkaya E.S., I.I.Alexeev, and C.R.Clauer, Field-aligned
					current distribution in the transition current system,
					Journal of Geophys. Res., 109, A11207,
					doi:10.1029/2004JA010484, 2004.
				</li>
				<li>
					Burton R. K., McPherron R. L., Russell C. T., An empirical
					relationship between interplanetary conditions and Dst, J.
					Geophys. Res., <b>80</b>, 4204 (1975).
				</li>
				<li>
					Kalegaev V.V., Ganushkina N. Yu., Global magnetospheric
					dynamics during magnetic storms of different intensities.
					AGU Monograph &quot;Physics and Modeling of the Inner
					Magnetosphere&quot;, 293, (2005).
				</li>
				<li>
					Kalegaev V. V., Ganushkina N. Yu., Pulkkinen T. I.,
					Kubyshkina M. V., Singer H. J., Russell C. T., Relation
					between the ring current and the tail current during
					magnetic storms, Ann. Geoph. <b>26</b>, 523 (2005).
				</li>
				<li>
					V.V. Kalegaev, E.V. Makarenkov, Storm-time ring and tail
					current dynamics under extremely disturbed conditions,
					Journ. of Atm. and Sol.-Terr. Phys., 70, 519 (2008),
					doi:10.1016/j.jastp.2007.08.029.
				</li>
				<li>
					O’Brien T. P., McPherron R. L., An empirical phase space
					analysis of ring current dynamics: Solar wind control of
					injectionand decay, J. Geophys. Res., <b>105</b>, 7707
					(2000).
				</li>
				<li>
					Shue J.-H., Song P., Russel C. T., Steinberg J .T., Chao J.
					K., Zastenker G., Vaisberg O. L., Kokubun S., Singer H. S.,
					Detman T. R., Kawano H., Magnetopause location under extreme
					solar wind conditions, J. Geophys. Res., 103,17691-17700,
					1998.
				</li>
				<li>
					Starkov, G.V., Planetary morphology of the aurora, In
					<i>Magnetosphere-Ionosphere Physics</i>, S.-Petersburg:
					Nauka, 85-90, 1993.
				</li>
			</ol>
	
`;

let test = Dsc.replace("\\(", '<span class="MathJax">')
	.replace("\\)", "</span>")
	.replace(/\$\$(.*?)\$\$/gi, '<span class="MathJaxFormula">$&</span>')
	.replace(/\$/g, "");

export default (
	<div>
		{ReactHtmlParser(test, {
			transform: function(node) {
				console.log(node);
				// if (
				// 	node.type === "p" &&
				// 	node.children[0] !== null &&
				// 	node.children[0].type === "tag" &&
				// 	node.children[0].attribs.class === "MathJaxFormula"
				// ) {
				// 	return (<div/>);
				// } else 
				if (
					node.type === "text" &&
					node.parent !== null &&
					node.parent.type === "tag"
				) {
					if (node.parent.attribs.class === "MathJax") {
						return (
							<MathJax.Context input="tex" key={node.data}>
								<MathJax.Node inline>{node.data}</MathJax.Node>
							</MathJax.Context>
						);
					} else if (node.parent.attribs.class === "MathJaxFormula") {
						return (
							<span key={node.data}>
								<MathJax.Context input="tex" key={node.data}>
									<span>
										<MathJax.Node>{node.data}</MathJax.Node>
									</span>
								</MathJax.Context>
							</span>
						);
					}
				}
			}
		})}
	</div>
);
